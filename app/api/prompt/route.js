import Prompt from '@models/prompt'
import { connectToDB } from '@utils/database'

export const GET = async (request) => {
  try {
    await connectToDB()

    // Only get prompts where creator is not null
    const prompts = await Prompt.find({ creator: { $ne: null } })
      .populate('creator', ['username', 'email', 'image']) // only needed fields

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}
