import { prisma } from 'config/client';
import { hashPassword } from 'services/user.service';
import { ACCOUNT_TYPE } from 'config/constant';


const initDatabase = async () => {
    const CountUser = await prisma.user.count();
    const CountRole = await prisma.role.count();


    if (CountRole === 0) {


        await prisma.role.createMany({

            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền"
                },
                {
                    name: "USER",
                    description: "User thông thường"
                }
            ]
        })
    }
    if (CountUser === 0) {
        const defaultPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: {
                name: "ADMIN"
            }
        });
        if (adminRole)
            await prisma.user.createMany({

                data: [
                    {
                        fullName: " Hỏi dân IT",
                        username: "hoidanit@example.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },

                    {
                        fullName: " Admin",
                        username: "admin@example.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id

                    }
                ]
            })
    }
    if (CountRole !== 0 && CountUser !== 0) {
        console.log(">>>ALREADY INIT DATABASE<<<");
    }
}
export default initDatabase;