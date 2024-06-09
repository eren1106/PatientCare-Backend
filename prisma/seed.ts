const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  // Clean the database
  await prisma.injury.deleteMany();
  
  await prisma.response.deleteMany();
  await prisma.call.deleteMany();
  await prisma.message.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.dailyPatientExercise.deleteMany();
  await prisma.patientExercise.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.doctorValidation.deleteMany();
  await prisma.question.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.questionnaire.deleteMany();
  await prisma.fieldType.deleteMany();
  await prisma.patientRecord.deleteMany();
  await prisma.user.deleteMany();



  
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
      username: 'john_doe_123',
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

  const user3 = await prisma.user.create({
    data: {
      username: 'wubang',
      email: 'wubang1232@example.com',
      password: 'securepassword',
      signinMethod: 'GOOGLE',
      role: 'PATIENT',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: 'zhenen',
      email: 'wubang@example.com',
      password: 'securepassword',
      signinMethod: 'GOOGLE',
      role: 'PATIENT',
    },
  });

  const user5 = await prisma.user.create({
    data: {
      username: 'wubang2',
      email: 'wuban2g@example.com',
      password: 'securepassword',
      signinMethod: 'GOOGLE',
      role: 'PATIENT',
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

  // Create Patient Records
  const patientRecord1 = await prisma.patientRecord.create({
    data: {
      doctorId: user2.id,
      patientId: user1.id,
      ic_no: '0123456789',
      age: 32,
      gender: 'FEMALE',
      weight: 50,
      height: 1.5,
      progressReport: 'pdf'
    },
  });


  // Create Injury Details
  const injury1 = await prisma.injury.create({
    data: {
      patientRecordId: patientRecord1.id,
      painRegion: 'Knee',
      duration: 'Once in a week',
      painScore: 1,
      is_recurrent: 'YES',
      description: "A bit pain at ankle"
    }
  })

  const injury2 = await prisma.injury.create({
    data: {
      patientRecordId: patientRecord1.id,
      painRegion: 'Shoulder',
      duration: 'Daily',
      painScore: 5,
      is_recurrent: 'YES',
      description: 'Contusion at left shoulder'
    }
  })

  // Create Assessments
  const assessment1 = await prisma.assessment.create({
    data: {
      userId: user1.id,
      questionnaireId: questionnaire1.id,
      patientRecordId: patientRecord1.id,
    },
  });

  const assessment2 = await prisma.assessment.create({
    data: {
      userId: user2.id,
      questionnaireId: questionnaire2.id,
      patientRecordId: patientRecord1.id,
    },
  });

  // Create Responses
  const response1 = await prisma.response.create({
    data: {
      questionId: question1.id,
      assessmentId: assessment1.id,
      response: '3 times a week',
    },
  });

  const response2 = await prisma.response.create({
    data: {
      questionId: question2.id,
      assessmentId: assessment2.id,
      response: 'No',
    },
  });

  // Create Doctor Validations
  const doctorValidation1 = await prisma.doctorValidation.create({
    data: {
      doctorId: user2.id,
      registrationNumber: 'DOC123456',
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

  const exercise3 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory1.id,
      title: 'Cycling',
      description: 'Cycling exercise',
      duration: 40,
      difficulty: 'EASY',
    },
  });

  const exercise4 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Push-Ups',
      description: 'Push-ups exercise',
      duration: 20,
      difficulty: 'MEDIUM',
    },
  });

  const exercise5 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Deadlifts',
      description: 'Deadlift exercise',
      duration: 50,
      difficulty: 'HARD',
    },
  });

  // Create Patient Exercises
  const patientExercise1 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise1.id,
      sets: 3,
    },
  });

  const patientExercise2 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise2.id,
      sets: 4,
    },
  });

  const patientExercise3 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise3.id,
      sets: 2,
    },
  });

  const patientExercise4 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise4.id,
      sets: 3,
    },
  });

  const patientExercise5 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise5.id,
      sets: 5,
    },
  });

  // Create Daily Patient Exercises
  const dailyPatientExercise1 = await prisma.dailyPatientExercise.create({
    data: {
      patientId: user1.id,
      patientExerciseId: patientExercise1.id,
    },
  });

  const dailyPatientExercise2 = await prisma.dailyPatientExercise.create({
    data: {
      patientId: user1.id,
      patientExerciseId: patientExercise2.id,
    },
  });

  const dailyPatientExercise3 = await prisma.dailyPatientExercise.create({
    data: {
      patientId: user1.id,
      patientExerciseId: patientExercise3.id,
    },
  });

  const dailyPatientExercise4 = await prisma.dailyPatientExercise.create({
    data: {
      patientId: user1.id,
      patientExerciseId: patientExercise4.id,
    },
  });

  const dailyPatientExercise5 = await prisma.dailyPatientExercise.create({
    data: {
      patientId: user1.id,
      patientExerciseId: patientExercise5.id,
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
