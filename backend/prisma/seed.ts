import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
    await prisma.roles.create({
        data: {
            name: "Admin",
        }
    });
    await prisma.roles.create({
        data: {
            name: "Coordinador",
        }
    });
    await prisma.roles.create({
        data: {
            name: "Docente",
        }
    });
    await prisma.roles.create({
        data: {
            name: "Estudiante",
        }
    });
    await prisma.modalities.create({
        data: {
            name: "Virtual",
        }
    });
    await prisma.modalities.create({
        data: {
            name: "Remoto",
        }
    });
    await prisma.modalities.create({
        data: {
            name: "Presencial",
        }
    });
    await prisma.inscriptionStatus.create({
        data: {
            name: "Inscrito",
        }
    });
    await prisma.inscriptionStatus.create({
        data: {
            name: "Aprobado",
        }
    });
    await prisma.inscriptionStatus.create({
        data: {
            name: "Rechazado",
        }
    });
    await prisma.inscriptionStatus.create({
        data: {
            name: "Certificado",
        }
    });

    await prisma.users.create({
        data: {
            firstName: "John",
            lastName: "Doe",
            email: "admin@admin.com",
            phone: "123456789",
            roleId: 1,
            password: await bcrypt.hash("admin", 10),
        }
    });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })