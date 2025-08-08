import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    
    // Clean existing data
    await prisma.shipment.deleteMany()
    await prisma.order.deleteMany()
    await prisma.inventory.deleteMany()
    await prisma.product.deleteMany()
    await prisma.warehouse.deleteMany()

    const productData = [
        { name: "Laptop", description: "10th generation laptop", category: "Electronics" },
        { name: "Chair", description: "Comfortable, stury metal chair", category: "Furniture" },
        { name: "Desk", description: "Office desk", category: "Furniture" },
        { name: "Headphones", description: "Noise cancelling headphones", category: "Electronics" },
        { name: "Smartphone", description: "Multi-lens smartphone", category: "Electronics" },
        { name: "Monitor", description: "4K Ultra HD monitor", category: "Electronics" },
        { name: "Backpack", description: "Waterproof backpack", category: "Accessories" },
    ];

    console.log("Seeding products....");

    const products = await Promise.all(
        productData.map(product => prisma.product.create({ data: product }))
    )
  
    console.log('Seeding warehouses...')
  
    const warehouseData = [
        { name: 'West Coast Distribution Center', location: 'Los Angeles, CA' },
        { name: 'East Coast Center', location: 'Atlanta, GA' },
        { name: 'Central Hub', location: 'Chicago, IL' },
        { name: 'Northwest Hub', location: 'Seattle, WA' },
        { name: 'Texas Distribution Center', location: 'Dallas, TX' }
    ]

    const warehouses = await Promise.all(
        warehouseData.map(warehouse => prisma.warehouse.create({ data: warehouse }))
    )
  
    


}