const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create FieldTypes
  const fieldType1 = await prisma.fieldType.create({
    data: {
      name: 'Text',
    },
  });

  const fieldType2 = await prisma.fieldType.create({
    data: {
      name: 'Multiple Choice',
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'securepassword',
      signinMethod: 'EMAILPASSWORD',
      role: 'PATIENT',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'securepassword',
      signinMethod: 'GOOGLE',
      role: 'DOCTOR',
    },
  });

  // Create Questionnaires
  const questionnaire1 = await prisma.questionnaire.create({
    data: {
      title: 'Health Check',
      description: 'Basic health check questionnaire',
      type: 'General',
      authorId: user1.id,
    },
  });

  const questionnaire2 = await prisma.questionnaire.create({
    data: {
      title: 'Fitness Survey',
      description: 'Fitness related questions',
      type: 'Fitness',
      authorId: user2.id,
    },
  });

  // Create Questions
  const question1 = await prisma.question.create({
    data: {
      title: 'How often do you exercise?',
      fieldTypeId: fieldType2.id,
      questionnaire: {
        connect: { id: questionnaire1.id },
      },
    },
  });

  const question2 = await prisma.question.create({
    data: {
      title: 'Do you have any chronic diseases?',
      fieldTypeId: fieldType1.id,
      questionnaire: {
        connect: { id: questionnaire2.id },
      },
    },
  });

  // Create Responses
  const response1 = await prisma.response.create({
    data: {
      questionId: question1.id,
      response: '3 times a week',
    },
  });

  const response2 = await prisma.response.create({
    data: {
      questionId: question2.id,
      response: 'No',
    },
  });

  // Create Assessments
  const assessment1 = await prisma.assessment.create({
    data: {
      userId: user1.id,
      questionnaireId: questionnaire1.id,
      responseId: response1.id,
    },
  });

  const assessment2 = await prisma.assessment.create({
    data: {
      userId: user2.id,
      questionnaireId: questionnaire2.id,
      responseId: response2.id,
    },
  });

  // Create Doctor Validations
  const doctorValidation1 = await prisma.doctorValidation.create({
    data: {
      doctorId: user2.id,
      registrationNumber: 'DOC123456',
    },
  });

  // Create Patient Records
  const patientRecord1 = await prisma.patientRecord.create({
    data: {
      doctorId: user2.id,
      patientId: user1.id,
    },
  });

  // Create Exercise Categories
  const exerciseCategory1 = await prisma.exerciseCategory.create({
    data: {
      title: 'Cardio',
      description: 'Cardio exercises',
    },
  });

  const exerciseCategory2 = await prisma.exerciseCategory.create({
    data: {
      title: 'Strength',
      description: 'Strength training exercises',
    },
  });

  // Create Exercises
  const exercise1 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory1.id,
      title: 'Running',
      description: 'Running exercise',
      duration: 30,
      difficulty: 'MEDIUM',
    },
  });

  const exercise2 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Weight Lifting',
      description: 'Weight lifting exercise',
      duration: 45,
      difficulty: 'HARD',
    },
  });

  // Create Patient Exercises
  const patientExercise1 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise1.id,
    },
  });

  const patientExercise2 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise2.id,
    },
  });

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
