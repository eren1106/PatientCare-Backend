import { Gender } from "@prisma/client";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // npx prisma db push --force-reset  <= CLEAN ALL TABLE DATA WITH THIS COMMENT

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
      fullname: 'John Doe',
      age: 22,
      gender: Gender.MALE,
      ic: "020203023456",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'securepassword',
      signinMethod: 'GOOGLE',
      role: 'DOCTOR',
      fullname: 'Jane Doe',
      age: 26,
      gender: Gender.MALE,
      ic: "980304067891",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'wubang',
      email: 'wubang1232@example.com',
      password: 'securepassword',
      signinMethod: 'GOOGLE',
      role: 'PATIENT',
      fullname: 'Wu Bang',
      age: 22,
      gender: Gender.MALE,
      ic: "020203027897",
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: 'zilii',
      email: 'zilii@example.com',
      password: 'securepassword',
      signinMethod: 'EMAILPASSWORD',
      role: 'PATIENT',
      fullname: 'Zi Lii',
      age: 22,
      gender: Gender.MALE,
      ic: "021212025555",
    },
  });

  // const user4 = await prisma.user.create({
  //   data: {
  //     username: 'zhenen',
  //     email: 'zhenen@example.com',
  //     password: 'securepassword',
  //     signinMethod: 'GOOGLE',
  //     role: 'PATIENT',
  //     fullname: 'Zhen En',
  //   },
  // });

  // const user5 = await prisma.user.create({
  //   data: {
  //     username: 'wubang2',
  //     email: 'wuban2g@example.com',
  //     password: 'securepassword',
  //     signinMethod: 'GOOGLE',
  //     role: 'PATIENT',
  //     fullname: 'Zheng Wu Bang',
  //   },
  // });

  // Create Questionnaires
  const questionnaire1 = await prisma.questionnaire.create({
    data: {
      title: 'Shoulder Pain and Disability Index (SPADI)',
      description: 'The Shoulder Pain and Disability Index (SPADI) is a self-administered questionnaire that consists of two dimensions, one for pain and the other for functional activities. The pain dimension consists of five questions regarding the severity of an individuals pain. Functional activities are assessed with eight questionsdesigned to measure the degree of difficulty an individual has with various activities of daily living that require upper-extremity use. The SPADI takes 5 to 10 minutes for a patient to complete and is the only reliable and valid region-specific measure for the shoulder.',
      type: 'Shoulder',
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

  const question3 = await prisma.question.create({
    data: {
      title: 'How severe is your pain? Choose the number that best describes your pain',
      fieldTypeId: fieldType2.id,
      questionnaire: {
        connect: { id: questionnaire1.id },
      },
    },
  });

  const option4 = await prisma.option.create({
    data : {
      content: '0 - No pain', 
      questionId: question3.id
    }
  });

  const option5 = await prisma.option.create({
    data : {
      content: '1 - Less pain', 
      questionId: question3.id
    }
  });

  const option6 = await prisma.option.create({
    data : {
      content: '2 - Pain', 
      questionId: question3.id
    }
  });

  const option7 = await prisma.option.create({
    data : {
      content: '3 - Very Pain', 
      questionId: question3.id
    }
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


  const option1 = await prisma.option.create({
    data: {
      content: 'Daily', 
      questionId: question1.id
    },
  });

  const option2 = await prisma.option.create({
    data : {
      content: 'Weekly', 
      questionId: question1.id
    }
  });

  const option3 = await prisma.option.create({
    data : {
      content: 'Monthly', 
      questionId: question1.id
    }
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
      title: 'Shoulder Bursitis Rehab',
      description: 'Shoulder Bursitis Rehab involves a structured program of rest, physical therapy, and exercises aimed at reducing inflammation, relieving pain, and restoring shoulder function and mobility.',
      content: 'Shoulder Bursitis Rehab is a comprehensive treatment program designed to alleviate the inflammation and pain associated with shoulder bursitis, a condition where the bursae, small fluid-filled sacs that cushion the shoulder joint, become inflamed. The rehab process typically includes a combination of rest to reduce aggravation of the bursa, physical therapy to enhance shoulder strength and flexibility, and specific exercises to restore normal movement and prevent future injuries. Additionally, modalities such as ice therapy, anti-inflammatory medications, and in some cases, corticosteroid injections may be employed to manage pain and swelling. The goal is to enable patients to return to their daily activities and sports with improved shoulder function and without discomfort.',
      duration: 30,
      difficulty: 'EASY',
      thumbnailUrl: 'https://img.youtube.com/vi/432yWPJQ-is/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=432yWPJQ-is',
    },
  });

  const exercise2 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Stiff Knee Exercise',
      description: 'Stiff Knee Exercise involves targeted movements and stretches to improve flexibility, strength, and mobility in the knee joint.',
      content: "Stiff Knee Exercise is a targeted rehabilitation routine designed to alleviate stiffness, enhance flexibility, and strengthen the muscles around the knee joint. This program includes a variety of stretches, such as hamstring and calf stretches, which help to improve the range of motion. Strengthening exercises like leg lifts, quadriceps sets, and mini squats are incorporated to build muscle support around the knee. Additionally, low-impact activities like cycling or swimming may be recommended to promote joint mobility without placing excessive stress on the knee. Consistent practice of these exercises can help reduce pain, prevent further stiffness, and improve overall knee function, allowing individuals to return to their regular activities with greater ease and comfort.",
      duration: 45,
      difficulty: 'HARD',
      thumbnailUrl: 'https://img.youtube.com/vi/N4CUptFi3Qc/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=N4CUptFi3Qc',
    },
  });

  const exercise3 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Shoulder Dislocation Rehab',
      description: 'Shoulder Dislocation Rehab involves a series of exercises and therapies to restore stability, strength, and range of motion after a shoulder dislocation.',
      content: "Shoulder Dislocation Rehab is a structured rehabilitation program aimed at restoring the stability, strength, and range of motion of the shoulder joint following a dislocation. The rehab process begins with a period of immobilization to allow initial healing, followed by gradual reintroduction of movement through passive and active range-of-motion exercises. Strengthening exercises focus on the rotator cuff and shoulder stabilizing muscles to enhance joint stability and prevent future dislocations. Physical therapy may include resistance training, proprioception exercises, and manual therapy techniques to improve shoulder function. Throughout the rehab process, emphasis is placed on proper technique and gradual progression to ensure a safe return to daily activities and sports, reducing the risk of recurrent dislocations.",
      duration: 40,
      difficulty: 'HARD',
      thumbnailUrl: 'https://img.youtube.com/vi/AB1TWySCpVA/maxresdefault.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=AB1TWySCpVA',
    },
  });
  // const exercise4 = await prisma.exercise.create({
  //   data: {
  //     exerciseCategoryId: exerciseCategory2.id,
  //     title: 'Push-Ups',
  //     description: 'Push-ups exercise',
  //     duration: 20,
  //     difficulty: 'MEDIUM',
  //   },
  // });

  // const exercise5 = await prisma.exercise.create({
  //   data: {
  //     exerciseCategoryId: exerciseCategory2.id,
  //     title: 'Deadlifts',
  //     description: 'Deadlift exercise',
  //     duration: 50,
  //     difficulty: 'HARD',
  //   },
  // });

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

  // const patientExercise4 = await prisma.patientExercise.create({
  //   data: {
  //     patientId: user1.id,
  //     exerciseId: exercise4.id,
  //     sets: 3,
  //   },
  // });

  // const patientExercise5 = await prisma.patientExercise.create({
  //   data: {
  //     patientId: user1.id,
  //     exerciseId: exercise5.id,
  //     sets: 5,
  //   },
  // });

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

  // const dailyPatientExercise4 = await prisma.dailyPatientExercise.create({
  //   data: {
  //     patientId: user1.id,
  //     patientExerciseId: patientExercise4.id,
  //   },
  // });

  // const dailyPatientExercise5 = await prisma.dailyPatientExercise.create({
  //   data: {
  //     patientId: user1.id,
  //     patientExerciseId: patientExercise5.id,
  //   },
  // });

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
