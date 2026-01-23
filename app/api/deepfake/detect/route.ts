import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@gradio/client'
import { getDatabase } from '@/lib/mongodb'

export const maxDuration = 60 // Allow up to 60 seconds for video processing

export async function POST(request: NextRequest) {
  console.log('=== Deepfake API Called ===')
  
  try {
    const formData = await request.formData()
    const videoFile = formData.get('video') as File
    
    console.log('Video file received:', videoFile?.name, videoFile?.size)
    
    if (!videoFile) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime']
    if (!allowedTypes.includes(videoFile.type) && !videoFile.name.match(/\.(mp4|mov|avi|webm)$/i)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a video file (MP4, MOV, AVI, WebM)' },
        { status: 400 }
      )
    }

    console.log('Converting video to blob...')
    // Convert File to Blob for Gradio client
    const arrayBuffer = await videoFile.arrayBuffer()
    const blob = new Blob([arrayBuffer], { type: videoFile.type || 'video/mp4' })
    console.log('Blob created, size:', blob.size)

    console.log('Connecting to Hugging Face Space: ChitranshSahu/deepfake-detection')
    // Connect to Hugging Face Space
    const client = await Client.connect('ChitranshSahu/deepfake-detection')
    console.log('Connected to Hugging Face!')
    
    console.log('Running inference...')
    // Run inference
    const result = await client.predict('/run_inference', {
      video_path: blob,
    })
    console.log('Inference complete! Result:', JSON.stringify(result.data))

    // Extract the detection result
    const detectionResult = result.data as unknown
    
    // Try to store in MongoDB (but don't fail if MongoDB is unavailable)
    let recordId: string | null = null
    let dbSaved = false
    
    try {
      console.log('Attempting to save to MongoDB...')
      const db = await getDatabase()
      
      if (db) {
        const collection = db.collection('deepfake_detections')
        
        const record = {
          fileName: videoFile.name,
          fileSize: videoFile.size,
          fileType: videoFile.type,
          result: detectionResult,
          createdAt: new Date(),
          apiKey: process.env.DEEPFAKE_API_KEY ? 'configured' : 'not-configured',
        }
        
        const insertResult = await collection.insertOne(record)
        recordId = insertResult.insertedId.toString()
        dbSaved = true
        console.log('Saved to MongoDB with ID:', recordId)
      } else {
        console.log('MongoDB not available, skipping save')
      }
    } catch (dbError) {
      console.error('MongoDB save error (continuing without save):', dbError)
      // Continue without MongoDB - detection result is still valid
    }
    
    console.log('=== Request Complete ===')
    return NextResponse.json({
      success: true,
      detectionResult,
      recordId,
      dbSaved,
      message: dbSaved ? 'Analysis complete and saved to database' : 'Analysis complete (database unavailable)',
    })
  } catch (error) {
    console.error('Deepfake detection error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to analyze video',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
