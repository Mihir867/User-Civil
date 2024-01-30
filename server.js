import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Customer from './database.js';
import nodemailer from 'nodemailer';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Change this to the actual origin of your React app
  methods: 'GET,POST',
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/Civil', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

connection.once('open', () => {
  console.log('MongoDB connected successfully');

  // Import the model and register it
  mongoose.model('Customer', Customer.schema); // Register the schema


  app.get('/api/users/inactive', async (req, res) => {
    const CustomerModel = mongoose.model('Customer');
    const inactiveUsers = await CustomerModel.find({
      lastLogin: { $lt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    });
    res.json(inactiveUsers);
  });

  app.get('/api/users/abandoned-courses', async (req, res) => {
    const CustomerModel = mongoose.model('Customer');
    const abandonedCoursesUsers = await CustomerModel.find({ checkoutStatus: false });
    res.json(abandonedCoursesUsers);
  });

  app.post('/api/mongodb/adduser', async (req, res) => {
    const CustomerModel = mongoose.model('Customer');
    const newUser = req.body;
  
    try {
      const addedUser = await CustomerModel.create(newUser);
      res.status(201).json(addedUser);
    } catch (error) {
      console.error('Error adding user to MongoDB:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mihirkantthakur786@gmail.com', 
      pass: 'vkchqlpvyungovju', 
    },
  });
  app.post('/api/send-email', async (req, res) => {
    const { to } = req.body;
  
    const mailOptions = {
        from: 'mihirkantthakur786@gmail.com',
        to,
        subject: 'We Miss You! 🌟',
        html: `
          <p>Hello,</p>
          <p>We noticed that you haven't visited our site recently. We miss you!</p>
          <p>Come back to the site and sign in to explore the latest updates and offers.</p>
          <p>Thank you for being a valued member of our community.</p>
          <p>Best regards,</p>
          <p>Your Site Name Team</p>
        `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  

  app.post('/api/send-abandoned-course-email', async (req, res) => {
    const { to } = req.body;

    const abandonedCourseMailOptions = {
        from: 'mihirkantthakur786@gmail.com',
        to,
        subject: 'We Miss You in Our Courses! 🎓',
        html: `
            <p>Hello,</p>
            <p>We noticed that you've abandoned a course on our site. We miss you!</p>
            <p>Come back and continue your learning journey with our latest courses.</p>
            <p>Thank you for choosing us as your learning platform.</p>
            <p>Best regards,</p>
            <p>Your Site Name Team</p>
        `,
    };

    try {
        await transporter.sendMail(abandonedCourseMailOptions);
        console.log('Abandoned course email sent successfully');
        res.status(200).json({ message: 'Abandoned course email sent successfully' });
    } catch (error) {
        console.error('Error sending abandoned course email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


  app.listen(3200, () => {
    console.log(`Server is listening on port 3200`);
  });
});
