import { PrismaClient } from '@prisma/client';
import seedData from './seed/data.json';

const prisma = new PrismaClient();

async function main() {
    
    // Clean existing data
    await prisma.shipment.deleteMany()
    await prisma.order.deleteMany()
    await prisma.inventory.deleteMany()
    await prisma.product.deleteMany()
    await prisma.warehouse.deleteMany()

    // Create products
    for (const productData of seedData.products) {
        await prisma.product.create({
            data: productData,
        });
    }

    // Create warehouses
    for (const warehouseData of seedData.warehouses) {
        await prisma.warehouse.create({
            data: warehouseData,
        })
    }


}