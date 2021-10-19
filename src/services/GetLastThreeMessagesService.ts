import prismaClient from "../prisma"

class GetLastThreeMessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      //limite de dados
      take: 3,
      orderBy: {
        // da mais nova pra mais velha
        created_at: "desc"
      },
      include: {
        user: true
      }
    })
    
    //SELECT * FROM MESSAGES LIMIT 3 ORDER BY CREATED_AT DESC

    return messages
  }
}

export { GetLastThreeMessagesService }