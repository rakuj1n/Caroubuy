import { cookies } from "next/dist/client/components/headers"

export const POST = async (req,res) => {
    try {
        cookies().set({
            name: 'client-token',
            value: '',
            httpOnly: true,
            expires: new Date('2016-10-05'),
            path:'/'
          })
        return new Response(JSON.stringify({message:'success'}),{status:200})
    } catch (err) {
        return new Response(err, {status:500})
    }
}