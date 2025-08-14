import { OrderStatus, PrismaClient, ShipmentStatus } from '../src/generated/prisma/index.js';
import seedData from './seed/data.json' with { type: 'json' };

const prisma = new PrismaClient();

async function main() {
    // Clean existing data in correct order (respecting foreign key constraints)
    await prisma.shipment.deleteMany();
    await prisma.order.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.warehouse.deleteMany();

    // Create products and get their actual IDs
    const createdProducts = await Promise.all(
        seedData.products.map((product, index) => 
            prisma.product.create({
                data: {
                    ...product,
                    id: index + 1 // Explicitly set ID to match JSON data
                }
            })
        )
    );

    // Create warehouses with explicit IDs
    const createdWarehouses = await Promise.all(
        seedData.warehouses.map((warehouse, index) =>
            prisma.warehouse.create({
                data: {
                    ...warehouse,
                    id: index + 1 // Explicitly set ID to match JSON data
                }
            })
        )
    );

    // Create inventories (the productId and warehouseId will match)
    await prisma.inventory.createMany({
        data: seedData.inventories,
    });

    // Create orders with explicit IDs
    const createdOrders = await Promise.all(
        seedData.orders.map((order, index) =>
            prisma.order.create({
                data: {
                    id: index + 1, // Explicit ID for shipments to reference
                    productId: order.productId,
                    warehouseId: order.warehouseId,
                    quantity: order.quantity,
                    status: order.status as OrderStatus,
                    createdAt: new Date(order.createdAt),
                }
            })
        )
    );

    // Create shipments
    await prisma.shipment.createMany({
        data: seedData.shipments.map(shipment => ({
            orderId: shipment.orderId,
            expectedDeliveryDate: new Date(shipment.expectedDeliveryDate),
            actualDeliveryDate: shipment.actualDeliveryDate ? new Date(shipment.actualDeliveryDate) : null,
            status: shipment.status as ShipmentStatus,
        })),
    });

    console.log('Database has been seeded');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });