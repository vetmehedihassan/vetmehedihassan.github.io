import 'dotenv/config';
import mongoose from 'mongoose';
import { env } from '../config/env';
import { hashPassword } from '../utils/password.util';
import User, { UserRole } from '../app/users/models/users.model';
import About from '../app/about/models/about.model';
import Experience, { ExperienceType } from '../app/experience/models/experience.model';
import Expertise from '../app/expertise/models/expertise.model';
import Education from '../app/education/models/education.model';
import Achievement from '../app/achievements/models/achievement.model';
import Resume from '../app/resume/models/resume.model';
import Blog from '../app/blogs/models/blog.model';
import { ContentStatus } from '../app/shared/constants/content-status';

async function seed() {
  await mongoose.connect(env.mongodbUri);
  console.log('Connected to MongoDB, seeding...');

  // --- Admin user ---
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'vetmehedihassan@gmail.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      email: adminEmail,
      password: await hashPassword(adminPassword),
      name: 'Dr. Md. Mehedi Hassan',
      role: UserRole.ADMIN,
      isActive: true,
    });
    console.log(`Seeded admin user: ${adminEmail} (password: ${adminPassword} — change after first login)`);
  } else {
    console.log('Admin user already exists, skipping.');
  }

  // --- About (real content from the live site) ---
  await About.findOneAndUpdate(
    {},
    {
      summary:
        'A Bangladesh Veterinary Council registered veterinarian focused on companion animal medicine, emergency care, preventive healthcare and evidence-based clinical practice.',
      currentRole: 'Associate Veterinary Officer',
      clinicName: 'Happy Tails Premium Pet Care (Veterinary Clinic)',
      petsServedStat: '2000+',
      yearsExperienceStat: '3+',
      bvcRegistrationNumber: '10229',
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // --- Experience + Training (merged, real content) ---
  await Experience.deleteMany({});
  await Experience.insertMany([
    {
      type: ExperienceType.ROLE,
      title: 'Associate Veterinary Officer',
      organization: 'Happy Tails Premium Pet Care (Veterinary Clinic)',
      location: 'Chattogram, Bangladesh',
      startDate: new Date('2025-07-01'),
      endDate: null,
      isCurrent: true,
      bullets: [
        'Diagnose and treat companion animals while managing emergency and critical cases.',
        'Develop treatment plans and oversee hospitalized patients.',
        'Conduct medical treatment and participate in basic surgeries.',
        'Advise pet owners on preventive healthcare, nutrition, vaccination and long-term disease management.',
      ],
      order: 1,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    },
    {
      type: ExperienceType.ROLE,
      title: 'Intern Doctor',
      organization:
        'Hands-on clinical training across specialized veterinary teaching hospitals and animal-health institutions in Bangladesh and Thailand',
      location: 'Bangladesh & Thailand',
      startDate: new Date('2024-12-01'),
      endDate: new Date('2025-05-31'),
      isCurrent: false,
      bullets: [
        'Veterinary Teaching Hospital-MSU, Thailand',
        'Laboratory & Animal Hospital-MSU, Thailand',
        'S. A. Quaderi Teaching Veterinary Hospital',
        'CVASU Research Based Campus',
        'Teaching & Training Pet Hospital and Research Center',
        'Central Veterinary Hospital',
        'Central Cattle Breeding & Dairy Farm',
        'Bangladesh Livestock Research Institute (BLRI)',
        'Lalmonirhat Military Farm',
        'Bangladesh National Zoo',
        'Central Poultry Farm',
      ],
      order: 2,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    },
    {
      type: ExperienceType.TRAINING,
      title: 'International Clinical Training',
      organization: 'Maha Sarakham University (MSU), Thailand',
      location: 'Thailand',
      startDate: new Date('2024-12-01'),
      endDate: new Date('2025-05-31'),
      isCurrent: false,
      bullets: [
        'Applied evidence-based approaches to clinical assessment and treatment.',
        'Used advanced diagnostic facilities to support accurate clinical assessment.',
        'Performed daily routine activities for inpatient, outpatient and surgery.',
        'Operated within mobile unit to provide emergency critical care management and surgeries in remote areas.',
      ],
      order: 3,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    },
    {
      type: ExperienceType.TRAINING,
      title: 'National Clinical Training',
      organization: 'In Bangladesh',
      location: 'Bangladesh',
      startDate: new Date('2024-12-01'),
      endDate: new Date('2025-05-31'),
      isCurrent: false,
      bullets: [
        'S. A. Quaderi Teaching Veterinary Hospital, CVASU',
        'CVASU Research Based Campus, Hatahazi, Chattogram',
        'Teaching & Training Pet Hospital and Research Center, Purbachal, Dhaka',
        'Central Veterinary Hospital, Bongobazar, Dhaka',
      ],
      order: 4,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    },
  ]);

  // --- Expertise (real content) ---
  await Expertise.deleteMany({});
  await Expertise.insertMany(
    [
      ['Companion Animal Medicine', 'Clinical assessment and management of companion animal medical cases.'],
      ['Preventive Healthcare', 'Preventive care, vaccination guidance and long-term disease management.'],
      ['Emergency & Critical Care', 'Experience with emergency and critical-care presentations.'],
      ['Diagnostics', 'Clinical diagnosis with laboratory and diagnostic support.'],
      ['Basic Surgery', 'Participation & collaboration during medical and surgical procedures.'],
      ['Hospital Operations', 'Patient records, inpatient & outpatient oversight and clinical standards.'],
    ].map(([title, description], i) => ({
      title,
      description,
      order: i + 1,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    }))
  );

  // --- Education (real content) ---
  await Education.deleteMany({});
  await Education.insertMany([
    {
      degree: 'Doctor of Veterinary Medicine (DVM)',
      institution: 'Hajee Mohammad Danesh Science and Technology University, Dinajpur, Bangladesh',
      startYear: 2019,
      endYear: 2025,
      order: 1,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Bangladesh Navy School and College, Chattogram, Bangladesh',
      startYear: 2016,
      endYear: 2018,
      order: 2,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Bangladesh Navy School and College, Chattogram, Bangladesh',
      startYear: 2014,
      endYear: 2016,
      order: 3,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    },
  ]);

  // --- Achievements (real content) ---
  await Achievement.deleteMany({});
  await Achievement.insertMany(
    [
      ['International Clinical Training', 'Maha Sarakham University (MSU), Thailand'],
      ['First Aid Training', 'Bangladesh Red Crescent Society, HSTU RCY Unit'],
      ['Best Volunteer Award', 'Bangladesh Red Crescent Society, HSTU RCY Unit'],
      ['Cultural Excellence Certificate', 'Bangladesh Navy Family and Welfare Association (BNFWA)'],
    ].map(([title, issuingOrg], i) => ({
      title,
      issuingOrg,
      order: i + 1,
      status: ContentStatus.PRODUCTION,
      deletedAt: null,
    }))
  );

  // --- Resume (placeholder, per decision to fill via admin panel) ---
  await Resume.findOneAndUpdate(
    {},
    { driveUrl: 'https://drive.google.com/PLACEHOLDER-update-via-admin-panel' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // --- Blogs (placeholders, per decision — he writes real posts later) ---
  const existingBlogCount = await Blog.countDocuments();
  if (existingBlogCount === 0) {
    await Blog.insertMany([
      {
        title: 'Placeholder post 1 — update via admin panel',
        slug: 'placeholder-post-1',
        excerpt: 'Placeholder excerpt — replace with real content before publishing.',
        content: 'Placeholder content — replace with real content before publishing.',
        status: ContentStatus.DRAFT,
        publishedAt: null,
        deletedAt: null,
      },
      {
        title: 'Placeholder post 2 — update via admin panel',
        slug: 'placeholder-post-2',
        excerpt: 'Placeholder excerpt — replace with real content before publishing.',
        content: 'Placeholder content — replace with real content before publishing.',
        status: ContentStatus.DRAFT,
        publishedAt: null,
        deletedAt: null,
      },
    ]);
  }

  console.log('Seed complete.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
