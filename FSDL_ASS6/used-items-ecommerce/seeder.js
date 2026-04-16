const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Item = require('./models/Item');
const Wishlist = require('./models/Wishlist');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

const users = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123',
        role: 'user'
    }
];

const items = [
    {
        title: 'Toyota Camry 2020',
        description: 'Excellent condition, single owner, 30k miles.',
        price: 22000,
        category: 'Cars',
        status: 'approved'
    },
    {
        title: 'Yamaha R15 V3',
        description: 'Well maintained sports bike, 15k kms run.',
        price: 2500,
        category: 'Bikes',
        status: 'approved'
    },
    {
        title: 'iPhone 13 Pro',
        description: '128GB, Sierra Blue, battery health 95%',
        price: 800,
        category: 'Electronics',
        status: 'pending'
    }
];

// Import into DB
const importData = async () => {
    try {
        await User.deleteMany();
        await Item.deleteMany();
        await Wishlist.deleteMany();

        // Hash passwords before importing directly via create
        for (let user of users) {
             const salt = await bcrypt.genSalt(10);
             user.password = await bcrypt.hash(user.password, salt);
        }

        const createdUsers = await User.create(users);

        const adminUser = createdUsers[0]._id;
        const normalUser = createdUsers[1]._id;

        const sampleItems = items.map(item => {
            return {
                ...item,
                seller: item.title.includes('iPhone') ? normalUser : adminUser
            };
        });

        await Item.create(sampleItems);

        console.log('Data Imported successfully...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Destroy data
const destroyData = async () => {
    try {
        await User.deleteMany();
        await Item.deleteMany();
        await Wishlist.deleteMany();

        console.log('Data Destroyed successfully...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
