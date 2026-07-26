import { prisma } from 'config/client';


const initDatabase = async () => {
    const userCount = await prisma.user.count();
    if (userCount === 0) {


        await prisma.user.createMany({

            data: [
                {
                    username: "hoidanit@example.com",
                    password: "123456",
                    accountType: "SYSTEM"
                },
                {
                    username: "admin@example.com",
                    password: "123456",
                    accountType: "SYSTEM"
                }
            ]
        })
    }
    else {
        console.log(">>>ALREADY INIT DATABASE<<<");
    }
}
export default initDatabase;