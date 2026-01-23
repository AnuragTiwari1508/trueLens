import { MongoClient, Db, MongoClientOptions } from 'mongodb'

let clientPromise: Promise<MongoClient> | null = null

function getClientPromise(): Promise<MongoClient> | null {
  if (!process.env.MONGODB_URI) {
    console.warn('MongoDB URI not configured - database features disabled')
    return null
  }

  if (clientPromise) {
    return clientPromise
  }

  const uri = process.env.MONGODB_URI
  const options: MongoClientOptions = {
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  }

  const client = new MongoClient(uri, options)
  clientPromise = client.connect()
  
  return clientPromise
}

export default getClientPromise

export async function getDatabase(): Promise<Db | null> {
  const promise = getClientPromise()
  if (!promise) {
    return null
  }
  
  try {
    const client = await promise
    return client.db('truelens')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    return null
  }
}
