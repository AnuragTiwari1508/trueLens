import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    console.log('Calling fact-check API with text:', text.substring(0, 100) + '...')

    // Call the external fact-check API
    const apiUrl = `https://truelens-fact-check-api.onrender.com/fact-check?text=${encodeURIComponent(text)}`
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Fact-check API error:', errorData)
      throw new Error(errorData.detail || 'Fact-check API request failed')
    }

    const data = await response.json()
    console.log('Fact-check API response received')

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Fact-check error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to analyze text',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
