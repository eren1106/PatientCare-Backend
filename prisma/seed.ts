import { ExerciseDifficulty, Gender } from "@prisma/client";
import bcrypt from 'bcrypt';

export const getYouTubeThumbnail = (videoUrl: string): string | null => {
  const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // npx prisma db push --force-reset  <= CLEAN ALL TABLE DATA WITH THIS COMMENT


  const optionTemplate1 = await prisma.optionTemplate.create({
    data: {
      scaleType: 'PAIN_SCALE'
    },
  });

  const optionTemplate2 = await prisma.optionTemplate.create({
    data: {
      scaleType: 'NUMERIC_SCALE'
    },
  });

  const optionTemplate3 = await prisma.optionTemplate.create({
    data: {
      scaleType: 'FREQUENCY'
    },
  });

  const option = await prisma.option.createMany({
    data: [
      { optionTemplateId: optionTemplate1.id, scaleValue: 1, content: 'None' },
      { optionTemplateId: optionTemplate1.id, scaleValue: 2, content: 'Mild' },
      { optionTemplateId: optionTemplate1.id, scaleValue: 3, content: 'Moderate' },
      { optionTemplateId: optionTemplate1.id, scaleValue: 4, content: 'Severe' },
      { optionTemplateId: optionTemplate1.id, scaleValue: 5, content: 'Extreme' },

      { optionTemplateId: optionTemplate2.id, scaleValue: 1, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 2, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 3, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 4, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 5, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 6, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 7, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 8, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 9, content: null },
      { optionTemplateId: optionTemplate2.id, scaleValue: 10, content: null },

      { optionTemplateId: optionTemplate3.id, scaleValue: 1, content: 'Never' },
      { optionTemplateId: optionTemplate3.id, scaleValue: 2, content: 'Rarely' },
      { optionTemplateId: optionTemplate3.id, scaleValue: 3, content: 'Sometimes' },
      { optionTemplateId: optionTemplate3.id, scaleValue: 4, content: 'Often' },
      { optionTemplateId: optionTemplate3.id, scaleValue: 5, content: 'Always' },
    ]
  });

  // Create Admin
  const hashedPassword = await bcrypt.hash('securepassword', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'Patient Care Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      signinMethod: 'EMAILPASSWORD',
      profileImageUrl: 'https://external-preview.redd.it/kevin-durant-usa-mens-leading-point-scorer-in-olympic-v0-KlataPnkXqTtYczpASxTqgqJVaxrYZlL3YwsGBLVLuE.jpg?auto=webp&s=66bb76ac0496ece60bf9954b77489fd11f234f1d',
      role: 'ADMIN',
      fullname: 'Admin',
      age: 35,
      gender: Gender.MALE,
      ic: "990101123456",
      isVerified: true,
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe_123',
      email: 'john@gmail.com',
      password: hashedPassword,
      signinMethod: 'EMAILPASSWORD',
      profileImageUrl: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
      role: 'PATIENT',
      fullname: 'John Doe',
      age: 22,
      gender: Gender.MALE,
      ic: "020203023456",
      isVerified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'reiner_braun',
      email: 'reiner@gmail.com',
      password: hashedPassword,
      signinMethod: 'EMAILPASSWORD',
      role: 'DOCTOR',
      profileImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5q9GlWCAoQHPpOiDOECuYUeXW9MQP7Ddt-Q&s',
      fullname: 'Reiner Braun',
      age: 36,
      gender: Gender.MALE,
      ic: "880304067891",
      isVerified: true,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'wubang',
      email: 'wubang1232@gmail.com',
      password: hashedPassword,
      signinMethod: 'EMAILPASSWORD',
      role: 'PATIENT',
      profileImageUrl: 'https://p4.itc.cn/images01/20231219/8d424b652feb4021a31d4a676f7e0cf9.jpeg',
      fullname: 'Zheng Wu Bang',
      age: 22,
      gender: Gender.MALE,
      ic: "020203027897",
      isVerified: true,
    },
  });

  const userDemo = await prisma.user.create({
    data: {
      username: 'zilii',
      email: 'erenkuek1106@gmail.com',
      password: hashedPassword,
      signinMethod: 'EMAILPASSWORD',
      profileImageUrl: 'https://atd-blog.s3.us-east-2.amazonaws.com/wp-content/uploads/2022/04/16142821/cool-profile-pictures-for-girls-9.webp',
      role: 'PATIENT',
      fullname: 'Kuek Zi Lii',
      age: 22,
      gender: Gender.MALE,
      ic: "021212025555",
      isVerified: true,
    },
  });

  const message = await prisma.message.createMany({
    data: [
      // Messages between user2 and user1
      {
        message: 'Hey, how are you?',
        fromUserId: user2.id,
        toUserId: user1.id,
      },
      {
        message: 'I am good! How about you?',
        fromUserId: user1.id,
        toUserId: user2.id,
      },
      {
        message: 'Just working on a new project.',
        fromUserId: user2.id,
        toUserId: user1.id,
      },
      {
        message: 'That sounds interesting!',
        fromUserId: user1.id,
        toUserId: user2.id,
      },

      // Messages between user2 and user3
      {
        message: 'Hey, user3, are you available this week?',
        fromUserId: user2.id,
        toUserId: user3.id,
      },
      {
        message: 'I might be free on Friday, what’s up?',
        fromUserId: user3.id,
        toUserId: user2.id,
      },
      {
        message: 'I wanted to discuss a project idea with you.',
        fromUserId: user2.id,
        toUserId: user3.id,
      },
      {
        message: 'Sure, let’s meet on Friday then.',
        fromUserId: user3.id,
        toUserId: user2.id,
      },

      // Messages between user2 and user4
      {
        message: 'Hi Zi Lii, do you have time to chat?',
        fromUserId: user2.id,
        toUserId: userDemo.id,
      },
      {
        message: 'Yes, what do you want to talk about?',
        fromUserId: userDemo.id,
        toUserId: user2.id,
      },
      {
        message: 'It’s about a collaboration opportunity.',
        fromUserId: user2.id,
        toUserId: userDemo.id,
      },
      {
        message: 'I’m interested! Let’s discuss more.',
        fromUserId: userDemo.id,
        toUserId: user2.id,
      },
    ],
  });

  const calls = await prisma.call.createMany({
    data: [
      {
        toUserId: user2.id,
        fromUserId: user1.id,
        status: 'ACCEPTED',
        createdDatetime: new Date('2023-05-01T10:00:00Z'),
        duration: 300,
      },
      {
        toUserId: user1.id,
        fromUserId: user3.id,
        status: 'MISSED',
        createdDatetime: new Date('2023-05-02T14:30:00Z'),
        duration: 0,
      },
      {
        toUserId: userDemo.id,
        fromUserId: user1.id,
        status: 'ACCEPTED',
        createdDatetime: new Date('2023-05-03T09:15:00Z'),
        duration: 180,
      },
      {
        toUserId: user1.id,
        fromUserId: user2.id,
        status: 'ACCEPTED',
        createdDatetime: new Date('2023-05-04T16:45:00Z'),
        duration: 600,
      },
      {
        toUserId: user3.id,
        fromUserId: user1.id,
        status: 'REJECTED',
        createdDatetime: new Date('2023-05-05T11:20:00Z'),
        duration: 0,
      },
    ],
  });




  // Create Questionnaires

  // Questionnaire 1
  const questionnaire1 = await prisma.questionnaire.create({
    data: {
      title: 'Shoulder Pain and Disability Index',
      description: 'Please place a mark on the line that best represents your experience during the last week attributable to your shoulder problem.',
      index: 'SPADI',
      type: 'Shoulder',
      authorId: user2.id,
    },
  });

  const section1Questionnaire1 = await prisma.section.create({
    data: {
      name: 'Pain Scale',
      description: 'How severe is your pain? Circle the number that best describes your pain where: 0 = no pain and 10 = the worst pain imaginable. ',
      questionnaireId: questionnaire1.id
    }
  })

  const question1Section1 = await prisma.question.create({
    data: {
      title: 'At its worst?',
      optionId: optionTemplate2.id,
      sectionId: section1Questionnaire1.id
    }
  })

  const question2Section1 = await prisma.question.create({
    data: {
      title: 'When lying on the involved side ?',
      optionId: optionTemplate2.id,
      sectionId: section1Questionnaire1.id
    }
  })

  const question3Section1 = await prisma.question.create({
    data: {
      title: 'Reaching for something on a high shelf ?',
      optionId: optionTemplate2.id,
      sectionId: section1Questionnaire1.id
    }
  })

  const question4Section1 = await prisma.question.create({
    data: {
      title: 'Touching the back of your neck ?',
      optionId: optionTemplate2.id,
      sectionId: section1Questionnaire1.id
    }
  })

  const question5Section1 = await prisma.question.create({
    data: {
      title: 'Pushing with the involved arm ?',
      optionId: optionTemplate2.id,
      sectionId: section1Questionnaire1.id
    }
  })

  const section2Questionnaire1 = await prisma.section.create({
    data: {
      name: 'Disability scale',
      description: 'How much difficulty do you have? Circle the number that best describes your experience where: 0 = no difficulty and 10 = so difficult it requires help. ',
      questionnaireId: questionnaire1.id
    }
  })

  const question1Section2 = await prisma.question.create({
    data: {
      title: 'Washing your hair?',
      optionId: optionTemplate2.id,
      sectionId: section2Questionnaire1.id
    }
  })

  const question2Section2 = await prisma.question.create({
    data: {
      title: 'Washing your back?',
      optionId: optionTemplate2.id,
      sectionId: section2Questionnaire1.id
    }
  })

  const question3Section2 = await prisma.question.create({
    data: {
      title: 'Putting on an undershirt or jumper?',
      optionId: optionTemplate2.id,
      sectionId: section2Questionnaire1.id
    }
  })


  const question5Section2 = await prisma.question.create({
    data: {
      title: 'Putting on a shirt that buttons down the front?',
      optionId: optionTemplate2.id,
      sectionId: section2Questionnaire1.id
    }
  })

  const question6Section2 = await prisma.question.create({
    data: {
      title: 'Putting on your pants?',
      optionId: optionTemplate2.id,
      sectionId: section2Questionnaire1.id
    }
  })

  const question7Section2 = await prisma.question.create({
    data: {
      title: 'Placing an object on a high shelf?',
      optionId: optionTemplate2.id,
      sectionId: section2Questionnaire1.id
    }
  })

  const question8Section2 = await prisma.question.create({
    data: {
      title: 'Carrying a heavy object of 10 pounds (4.5 kilograms)',
      optionId: optionTemplate2.id,
      sectionId: section2Questionnaire1.id
    }
  })

  const question9Section2 = await prisma.question.create({
    data: {
      title: 'Removing something from your back pocket ?',
      optionId: optionTemplate2.id,
      sectionId: section2Questionnaire1.id
    }
  })


  // Questionnaire 2
  const questionnaire2 = await prisma.questionnaire.create({
    data: {
      title: 'Knee injury and Osteoarthritis Outcome Score',
      description: 'Originally published in 1998 in The Journal of Orthopaedic and Sports Physical Therapy, the Knee injury and Osteoarthritis Outcome Score (KOOS) assesses patient pain (9 items), other symptoms (7 items), function in daily living (17 items), function in sport and recreation (5 items), and knee related quality of life (4 items). Scores range from 0 to 100 with a score of 0 indicating the worst possible knee symptoms and 100 indicating no knee symptoms. The KOOS is a patient reported joint-specific score, which may be useful for assessing changes in knee pathology over time, with or without treatment.',
      index: 'KOOS',
      type: 'Knee',
      authorId: user2.id,
    },
  });

  const section1Questionnaire2 = await prisma.section.create({
    data: {
      name: 'Symptoms',
      description: 'Answer these questions thinking of your knee symptoms during the last week. ',
      questionnaireId: questionnaire2.id
    }
  })

  const question1Section1Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Do you have swelling in your knee?',
      optionId: optionTemplate3.id,
      sectionId: section1Questionnaire2.id
    }
  })

  const question2Section1Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Do you feel grinding, hear clicking, or any other type of noise when your knee moves?',
      optionId: optionTemplate3.id,
      sectionId: section1Questionnaire2.id
    }
  })

  const question3Section1Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Does your knee catch or hang up when moving?',
      optionId: optionTemplate3.id,
      sectionId: section1Questionnaire2.id
    }
  })

  const question4Section1Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Can you straighten your knee fully?',
      optionId: optionTemplate3.id,
      sectionId: section1Questionnaire2.id
    }
  })

  const question5Section1Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Can you bend your knee fully?s',
      optionId: optionTemplate3.id,
      sectionId: section1Questionnaire2.id
    }
  })

  const section2Questionnaire2 = await prisma.section.create({
    data: {
      name: 'Stiffness',
      description: 'The following questions concern the amount of joint stiffness you have experienced during the last week in your knee. Stiffness is a sensation of restriction or slowness in the ease with which you move your knee joint.',
      questionnaireId: questionnaire2.id
    }
  })

  const question1Section2Questionnaire2 = await prisma.question.create({
    data: {
      title: 'How severe is your knee joint stiffness after first wakening in the morning?',
      optionId: optionTemplate1.id,
      sectionId: section2Questionnaire2.id
    }
  })

  const question2Section2Questionnaire2 = await prisma.question.create({
    data: {
      title: 'How severe is your knee joint stiffness after sitting, lying, or resting later in the day?',
      optionId: optionTemplate1.id,
      sectionId: section2Questionnaire2.id
    }
  })

  const section3Questionnaire2 = await prisma.section.create({
    data: {
      name: 'Pain',
      description: 'What amount of knee pain have you experienced the last week during the following activities?',
      questionnaireId: questionnaire2.id
    }
  })


  const question1Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'How often do you experience knee pain?',
      optionId: optionTemplate3.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const question2Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Straightening knee fully',
      optionId: optionTemplate3.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const question3Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Twisting/pivoting on your knee',
      optionId: optionTemplate1.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const question4Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'bending knee fully',
      optionId: optionTemplate1.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const question5Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Walking on a flat surface',
      optionId: optionTemplate1.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const question6Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Going up or down stairs',
      optionId: optionTemplate1.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const question7Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'At night while in bed',
      optionId: optionTemplate1.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const question8Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Sitting or lying',
      optionId: optionTemplate1.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const question9Section3Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Standing upright',
      optionId: optionTemplate1.id,
      sectionId: section3Questionnaire2.id
    }
  })

  const section4Questionnaire2 = await prisma.section.create({
    data: {
      name: 'Function, Daily Living',
      description: 'This section describes your ability to move around and to look after yourself. For each of the following activities, please indicate the degree of difficulty you have experienced in the last week due to your knee.',
      questionnaireId: questionnaire2.id
    }
  })

  const question1Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Descending stairs',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question2Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Ascending stairs',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question3Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Rising from sitting',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question4Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Standing',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question5Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Bending to the floor/pick up an object',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question6Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Walking on a flat surface',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question7Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Getting in/out of a car',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question8Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Going shopping',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question9Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Putting on socks/stockings',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question10Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Rising from bed',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question11Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Taking off socks/stockings',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })


  const question12Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Lying in bed (turning over, maintaining knee position)',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question13Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Getting in/out of bath',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question14Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Sitting',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const question15Section4Questionnaire2 = await prisma.question.create({
    data: {
      title: 'Getting on/off toilet',
      optionId: optionTemplate1.id,
      sectionId: section4Questionnaire2.id
    }
  })

  const questionsSection4Questionnaire2 = await prisma.question.createMany({
    data: [
      { title: 'Heavy domestic duties (moving heavy boxes, scrubbing floors, etc)', optionId: optionTemplate1.id, sectionId: section4Questionnaire2.id },
      { title: 'Light domestic duties (cooking, dusting, etc)', optionId: optionTemplate1.id, sectionId: section4Questionnaire2.id }
    ]
  })

  const section5Questionnaire2 = await prisma.section.create({
    data: {
      name: 'Function, Sports and Recreational Activities',
      description: 'This section describes your ability to be active on a higher level. For each of the following activities, please indicate the degree of difficulty you have experienced in the last week due to your knee.',
      questionnaireId: questionnaire2.id
    }
  })

  const questionsSection5Questionnaire2 = await prisma.question.createMany({
    data: [
      { title: 'Suqatting ', optionId: optionTemplate1.id, sectionId: section5Questionnaire2.id },
      { title: 'Running ', optionId: optionTemplate1.id, sectionId: section5Questionnaire2.id },
      { title: 'Jumping ', optionId: optionTemplate1.id, sectionId: section5Questionnaire2.id },
      { title: 'Twisting/pivoting on your injured knee ', optionId: optionTemplate1.id, sectionId: section5Questionnaire2.id },
      { title: 'Kneeling ', optionId: optionTemplate1.id, sectionId: section5Questionnaire2.id }
    ]
  })

  const section6Questionnaire2 = await prisma.section.create({
    data: {
      name: 'Quality of Life',
      description: '',
      questionnaireId: questionnaire2.id
    }
  })

  const questionsSection6Questionnaire2 = await prisma.question.createMany({
    data: [
      { title: 'How often are you aware of your knee problem?', optionId: optionTemplate3.id, sectionId: section6Questionnaire2.id },
      { title: 'Have you modified your life style to avoid activities potentially damaging to your knee?', optionId: optionTemplate3.id, sectionId: section6Questionnaire2.id },
      { title: 'How much are you troubled with lack of confidence in your knee?', optionId: optionTemplate3.id, sectionId: section6Questionnaire2.id },
      { title: ' In general, how much difficulty do you have with your knee?', optionId: optionTemplate3.id, sectionId: section6Questionnaire2.id },
    ]
  })




  // Create Patient Records
  const patientRecord1 = await prisma.patientRecord.create({
    data: {
      doctorId: user2.id,
      patientId: user1.id,
      weight: 50,
      height: 1.5,
      progressReport: 'pdf'
    },
  });
  const patientRecord2 = await prisma.patientRecord.create({
    data: {
      doctorId: user2.id,
      patientId: userDemo.id,
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
      doctorId: user2.id,
      questionnaireId: questionnaire1.id,
      patientRecordId: patientRecord1.id,
      createdDatetime: new Date('2024-05-01T10:00:00Z'),
    },
  });

  const assessment2 = await prisma.assessment.create({
    data: {
      doctorId: user2.id,
      questionnaireId: questionnaire2.id,
      patientRecordId: patientRecord1.id,
      createdDatetime: new Date('2024-06-01T10:00:00Z'),

    },
  });

  const assessment3 = await prisma.assessment.create({
    data: {
      doctorId: user2.id,
      questionnaireId: questionnaire1.id,
      patientRecordId: patientRecord1.id,
      createdDatetime: new Date('2024-09-01T10:00:00Z'),

    },
  });

  const assessment4 = await prisma.assessment.create({
    data: {
      doctorId: user2.id,
      questionnaireId: questionnaire1.id,
      patientRecordId: patientRecord1.id,
      createdDatetime: new Date('2024-11-01T10:00:00Z'),
    },
  });

  const assessment5 = await prisma.assessment.create({
    data: {
      doctorId: user2.id,
      questionnaireId: questionnaire1.id,
      patientRecordId: patientRecord1.id,
      createdDatetime: new Date('2024-07-01T10:00:00Z'),
    },
  });
  // Find options to be reference in the response
  const option1 = await prisma.option.findFirst({
    where: {
      scaleValue: 1,
      content: null
    },
  });

  const option2 = await prisma.option.findFirst({
    where: {
      scaleValue: 2,
      content: null
    },
  });

  const option3 = await prisma.option.findFirst({
    where: {
      scaleValue: 3,
      content: null
    },
  });

  const option4 = await prisma.option.findFirst({
    where: {
      scaleValue: 4,
      content: null
    },
  });

  const option5 = await prisma.option.findFirst({
    where: {
      scaleValue: 5,
      content: null
    },
  });

  const option6 = await prisma.option.findFirst({
    where: {
      scaleValue: 6,
      content: null
    },
  });

  const option7 = await prisma.option.findFirst({
    where: {
      scaleValue: 7,
      content: null
    },
  });

  const option8 = await prisma.option.findFirst({
    where: {
      scaleValue: 8,
      content: null
    },
  });

  const option9 = await prisma.option.findFirst({
    where: {
      scaleValue: 9,
      content: null
    },
  });

  const option10 = await prisma.option.findFirst({
    where: {
      scaleValue: 10,
      content: null
    },
  });

  // Create Responses
  //TODO: uncomment and fix these errors
  const response1Assessment1 = await prisma.response.create({
    data: {
      questionId: question1Section1.id,
      assessmentId: assessment1.id,
      optionId: option1!.id,
    },
  });

  const response2Assessment1 = await prisma.response.create({
    data: {
      questionId: question2Section1.id,
      assessmentId: assessment1.id,
      optionId: option2!.id,
    },
  });

  const response3Assessment1 = await prisma.response.create({
    data: {
      questionId: question3Section1.id,
      assessmentId: assessment1.id,
      optionId: option3!.id,
    },
  });

  const response4Assessment1 = await prisma.response.create({
    data: {
      questionId: question4Section1.id,
      assessmentId: assessment1.id,
      optionId: option4!.id,
    },
  });

  const response5Assessment1 = await prisma.response.create({
    data: {
      questionId: question5Section1.id,
      assessmentId: assessment1.id,
      optionId: option5!.id,
    },
  });

  const response6Assessment1 = await prisma.response.create({
    data: {
      questionId: question1Section2.id,
      assessmentId: assessment1.id,
      optionId: option7!.id,
    },
  });

  const response7Assessment1 = await prisma.response.create({
    data: {
      questionId: question2Section2.id,
      assessmentId: assessment1.id,
      optionId: option8!.id,
    },
  });

  const response8Assessment1 = await prisma.response.create({
    data: {
      questionId: question3Section2.id,
      assessmentId: assessment1.id,
      optionId: option10!.id,
    },
  });

  const response9Assessment1 = await prisma.response.create({
    data: {
      questionId: question5Section2.id,
      assessmentId: assessment1.id,
      optionId: option10!.id,
    },
  });

  const response10Assessment1 = await prisma.response.create({
    data: {
      questionId: question6Section2.id,
      assessmentId: assessment1.id,
      optionId: option10!.id,
    },
  });

  const response11Assessment1 = await prisma.response.create({
    data: {
      questionId: question7Section2.id,
      assessmentId: assessment1.id,
      optionId: option6!.id,
    },
  });

  const response12Assessment1 = await prisma.response.create({
    data: {
      questionId: question8Section2.id,
      assessmentId: assessment1.id,
      optionId: option6!.id,
    },
  });

  const response13Assessment1 = await prisma.response.create({
    data: {
      questionId: question9Section2.id,
      assessmentId: assessment1.id,
      optionId: option3!.id,
    },
  });


  // Assessment 3

  const response1Assessment3 = await prisma.response.create({
    data: {
      questionId: question1Section1.id,
      assessmentId: assessment3.id,
      optionId: option10!.id,
    },
  });

  const response2Assessment3 = await prisma.response.create({
    data: {
      questionId: question2Section1.id,
      assessmentId: assessment3.id,
      optionId: option9!.id,
    },
  });

  const response3Assessment3 = await prisma.response.create({
    data: {
      questionId: question3Section1.id,
      assessmentId: assessment3.id,
      optionId: option8!.id,
    },
  });

  const response4Assessment3 = await prisma.response.create({
    data: {
      questionId: question4Section1.id,
      assessmentId: assessment3.id,
      optionId: option6!.id,
    },
  });

  const response5Assessment3 = await prisma.response.create({
    data: {
      questionId: question5Section1.id,
      assessmentId: assessment3.id,
      optionId: option7!.id,
    },
  });

  const response6Assessment3 = await prisma.response.create({
    data: {
      questionId: question1Section2.id,
      assessmentId: assessment3.id,
      optionId: option8!.id,
    },
  });

  const response7Assessment3 = await prisma.response.create({
    data: {
      questionId: question2Section2.id,
      assessmentId: assessment3.id,
      optionId: option5!.id,
    },
  });

  const response8Assessment3 = await prisma.response.create({
    data: {
      questionId: question3Section2.id,
      assessmentId: assessment3.id,
      optionId: option1!.id,
    },
  });

  const response9Assessment3 = await prisma.response.create({
    data: {
      questionId: question5Section2.id,
      assessmentId: assessment3.id,
      optionId: option2!.id,
    },
  });

  const response10Assessment3 = await prisma.response.create({
    data: {
      questionId: question6Section2.id,
      assessmentId: assessment3.id,
      optionId: option10!.id,
    },
  });

  const response11Assessment3 = await prisma.response.create({
    data: {
      questionId: question7Section2.id,
      assessmentId: assessment3.id,
      optionId: option8!.id,
    },
  });

  const response12Assessment3 = await prisma.response.create({
    data: {
      questionId: question8Section2.id,
      assessmentId: assessment3.id,
      optionId: option6!.id,
    },
  });

  const response13Assessment3 = await prisma.response.create({
    data: {
      questionId: question9Section2.id,
      assessmentId: assessment3.id,
      optionId: option3!.id,
    },
  });

  // Assessment 4

  const response1Assessment4 = await prisma.response.create({
    data: {
      questionId: question1Section1.id,
      assessmentId: assessment4.id,
      optionId: option3!.id,
    },
  });

  const response2Assessment4 = await prisma.response.create({
    data: {
      questionId: question2Section1.id,
      assessmentId: assessment4.id,
      optionId: option2!.id,
    },
  });

  const response3Assessment4 = await prisma.response.create({
    data: {
      questionId: question3Section1.id,
      assessmentId: assessment4.id,
      optionId: option3!.id,
    },
  });

  const response4Assessment4 = await prisma.response.create({
    data: {
      questionId: question4Section1.id,
      assessmentId: assessment4.id,
      optionId: option6!.id,
    },
  });

  const response5Assessment4 = await prisma.response.create({
    data: {
      questionId: question5Section1.id,
      assessmentId: assessment4.id,
      optionId: option7!.id,
    },
  });

  const response6Assessment4 = await prisma.response.create({
    data: {
      questionId: question1Section2.id,
      assessmentId: assessment4.id,
      optionId: option8!.id,
    },
  });

  const response7Assessment4 = await prisma.response.create({
    data: {
      questionId: question2Section2.id,
      assessmentId: assessment4.id,
      optionId: option5!.id,
    },
  });

  const response8Assessment4 = await prisma.response.create({
    data: {
      questionId: question3Section2.id,
      assessmentId: assessment4.id,
      optionId: option1!.id,
    },
  });

  const response9Assessment4 = await prisma.response.create({
    data: {
      questionId: question5Section2.id,
      assessmentId: assessment4.id,
      optionId: option2!.id,
    },
  });

  const response10Assessment4 = await prisma.response.create({
    data: {
      questionId: question6Section2.id,
      assessmentId: assessment4.id,
      optionId: option2!.id,
    },
  });

  const response11Assessment4 = await prisma.response.create({
    data: {
      questionId: question7Section2.id,
      assessmentId: assessment4.id,
      optionId: option1!.id,
    },
  });

  const response12Assessment4 = await prisma.response.create({
    data: {
      questionId: question8Section2.id,
      assessmentId: assessment4.id,
      optionId: option1!.id,
    },
  });

  const response13Assessment4 = await prisma.response.create({
    data: {
      questionId: question9Section2.id,
      assessmentId: assessment4.id,
      optionId: option1!.id,
    },
  });

   // Assessment 5

   const response1Assessment5 = await prisma.response.create({
    data: {
      questionId: question1Section1.id,
      assessmentId: assessment5.id,
      optionId: option1!.id,
    },
  });

  const response2Assessment5 = await prisma.response.create({
    data: {
      questionId: question2Section1.id,
      assessmentId: assessment5.id,
      optionId: option2!.id,
    },
  });

  const response3Assessment5 = await prisma.response.create({
    data: {
      questionId: question3Section1.id,
      assessmentId: assessment5.id,
      optionId: option3!.id,
    },
  });

  const response4Assessment5 = await prisma.response.create({
    data: {
      questionId: question4Section1.id,
      assessmentId: assessment5.id,
      optionId: option6!.id,
    },
  });

  const response5Assessment5 = await prisma.response.create({
    data: {
      questionId: question5Section1.id,
      assessmentId: assessment5.id,
      optionId: option7!.id,
    },
  });

  const response6Assessment5 = await prisma.response.create({
    data: {
      questionId: question1Section2.id,
      assessmentId: assessment4.id,
      optionId: option8!.id,
    },
  });

  const response7Assessment5 = await prisma.response.create({
    data: {
      questionId: question2Section2.id,
      assessmentId: assessment5.id,
      optionId: option3!.id,
    },
  });

  const response8Assessment5 = await prisma.response.create({
    data: {
      questionId: question3Section2.id,
      assessmentId: assessment5.id,
      optionId: option3!.id,
    },
  });

  const response9Assessment5 = await prisma.response.create({
    data: {
      questionId: question5Section2.id,
      assessmentId: assessment5.id,
      optionId: option7!.id,
    },
  });

  const response10Assessment5 = await prisma.response.create({
    data: {
      questionId: question6Section2.id,
      assessmentId: assessment5.id,
      optionId: option5!.id,
    },
  });

  const response11Assessment5 = await prisma.response.create({
    data: {
      questionId: question7Section2.id,
      assessmentId: assessment5.id,
      optionId: option5!.id,
    },
  });

  const response12Assessment5 = await prisma.response.create({
    data: {
      questionId: question8Section2.id,
      assessmentId: assessment5.id,
      optionId: option5!.id,
    },
  });

  const response13Assessment5 = await prisma.response.create({
    data: {
      questionId: question9Section2.id,
      assessmentId: assessment5.id,
      optionId: option5!.id,
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
      title: 'Wall Squat',
      description: 'Wall Squat is a lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      content: 'Wall Squat is a lower body exercise that targets the quadriceps, hamstrings, and glutes. This exercise is performed by leaning against a wall with the feet shoulder-width apart and sliding down into a seated position with the knees at a 90-degree angle. The wall provides support and stability, making it an ideal exercise for beginners or those with knee issues. Wall Squat helps to strengthen the muscles of the lower body, improve balance and stability, and increase overall leg strength. It can be performed with or without weights, depending on the individual’s fitness level and goals.',
      duration: 30,
      difficulty: ExerciseDifficulty.EASY,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/rRxESnji06A"),
      videoUrl: 'https://youtu.be/rRxESnji06A',
    },
  });

  const exercise2 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Quadriceps stretch',
      description: 'Quadriceps stretch is a stretching exercise that targets the quadriceps muscles in the front of the thigh.',
      content: "Quadriceps stretch is a stretching exercise that targets the quadriceps muscles in the front of the thigh. This exercise is performed by standing on one leg and bending the other leg at the knee, bringing the heel towards the buttocks. The hand on the same side as the bent leg can be used to gently pull the foot closer to the buttocks to increase the stretch. Quadriceps stretch can help improve flexibility, reduce muscle tension, and prevent injury in the quadriceps muscles. It is commonly used as part of a warm-up or cool-down routine for athletes and fitness enthusiasts.",
      duration: 45,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/one9XVRyHhE"),
      videoUrl: 'https://youtu.be/one9XVRyHhE',
    },
  });

  const exercise3 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Calf stretch',
      description: 'Calf stretch is a stretching exercise that targets the calf muscles in the back of the lower leg.',
      content: "Calf stretch is a stretching exercise that targets the calf muscles in the back of the lower leg. This exercise is performed by standing facing a wall with one foot in front of the other and the hands on the wall for support. The back leg is kept straight, and the heel is pressed into the ground to stretch the calf muscle. Calf stretch can help improve flexibility, reduce muscle tension, and prevent injury in the calf muscles. It is commonly used as part of a warm-up or cool-down routine for athletes and fitness enthusiasts.",
      duration: 40,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail('https://youtu.be/XDvDYfQLTfM'),
      videoUrl: 'https://youtu.be/XDvDYfQLTfM',
    },
  });

  const exercise4 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory1.id,
      title: 'Squat',
      description: 'Squat is a lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      content: 'Squat is a lower body exercise that targets the quadriceps, hamstrings, and glutes. This exercise is performed by standing with the feet shoulder-width apart and lowering the body into a seated position with the knees at a 90-degree angle. The weight is shifted back into the heels, and the chest is lifted to maintain a neutral spine. Squat helps to strengthen the muscles of the lower body, improve balance and stability, and increase overall leg strength. It can be performed with or without weights, depending on the individual’s fitness level and goals.',
      duration: 30,
      difficulty: ExerciseDifficulty.EASY,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/p7xbRTKo_qM"),
      videoUrl: 'https://youtu.be/p7xbRTKo_qM',
    },
  });

  const exercise5 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Clam',
      description: 'Clam is a lower body exercise that targets the glutes and hip abductors.',
      content: "Clam is a lower body exercise that targets the glutes and hip abductors. This exercise is performed by lying on one side with the hips and knees bent at a 90-degree angle. The feet are stacked on top of each other, and the top knee is lifted towards the ceiling while keeping the feet together. Clam helps to strengthen the muscles of the hips and glutes, improve hip stability, and prevent injury in the lower body. It can be performed with or without resistance bands, depending on the individual’s fitness level and goals.",
      duration: 45,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/_XgIeO3sA7c"),
      videoUrl: 'https://youtu.be/_XgIeO3sA7c',
    },
  });

  const exercise6 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Marching on soft surface',
      description: 'Marching on soft surface is a lower body exercise that targets the glutes and hip abductors.',
      content: "Marching on soft surface is a lower body exercise that targets the glutes and hip abductors. This exercise is performed by standing on one leg and lifting the opposite knee towards the chest while maintaining balance on a soft surface. The foot is lowered back to the ground and the movement is repeated on the other side. Marching on soft surface helps to strengthen the muscles of the hips and glutes, improve balance and stability, and prevent injury in the lower body. It can be performed with or without resistance bands, depending on the individual’s fitness level and goals.",
      duration: 40,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail('https://youtu.be/SKBszAgSFtI'),
      videoUrl: 'https://youtu.be/SKBszAgSFtI',
    },
  });

  const exercise7 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory1.id,
      title: 'Air cycle',
      description: '',
      content: '',
      duration: 30,
      difficulty: ExerciseDifficulty.EASY,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/YBeAH0lS9wE"),
      videoUrl: 'https://youtu.be/YBeAH0lS9wE',
    },
  });

  const exercise8 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Calf stretch close up',
      description: 'Calf stretch is a stretching exercise that targets the calf muscles in the back of the lower leg.',
      content: "Calf stretch is a stretching exercise that targets the calf muscles in the back of the lower leg. This exercise is performed by standing facing a wall with one foot in front of the other and the hands on the wall for support. The back leg is kept straight, and the heel is pressed into the ground to stretch the calf muscle. Calf stretch can help improve flexibility, reduce muscle tension, and prevent injury in the calf muscles. It is commonly used as part of a warm-up or cool-down routine for athletes and fitness enthusiasts.",
      duration: 45,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/N2m_wjMzMYM"),
      videoUrl: 'https://youtu.be/N2m_wjMzMYM',
    },
  });

  const exercise9 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Seat up',
      description: '',
      content: "",
      duration: 40,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail('https://youtu.be/YDEfl_ae_no'),
      videoUrl: 'https://youtu.be/YDEfl_ae_no',
    },
  });

  const exercise10 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory1.id,
      title: 'Straight leg raise',
      description: 'Straight leg raise is a lower body exercise that targets the quadriceps muscles in the front of the thigh.',
      content: 'Straight leg raise is a lower body exercise that targets the quadriceps muscles in the front of the thigh. This exercise is performed by lying on the back with one leg bent at the knee and the other leg straight. The straight leg is lifted towards the ceiling while keeping it straight and the foot flexed. Straight leg raise helps to strengthen the muscles of the quadriceps, improve hip stability, and prevent injury in the lower body. It can be performed with or without ankle weights, depending on the individual’s fitness level and goals.',
      duration: 30,
      difficulty: ExerciseDifficulty.EASY,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/jeCK1e_BH6M"),
      videoUrl: 'https://youtu.be/jeCK1e_BH6M',
    },
  });

  const exercise11 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Gluteus stretch',
      description: 'Gluteus stretch is a stretching exercise that targets the gluteus muscles in the buttocks.',
      content: 'Gluteus stretch is a stretching exercise that targets the gluteus muscles in the buttocks. This exercise is performed by lying on the back with one leg bent at the knee and the other leg crossed over the bent knee. The hands are placed behind the thigh of the bent leg and gently pulled towards the chest to increase the stretch in the gluteus muscles. Gluteus stretch can help improve flexibility, reduce muscle tension, and prevent injury in the gluteus muscles. It is commonly used as part of a warm-up or cool-down routine for athletes and fitness enthusiasts.',
      duration: 45,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/LxQLxgPS8S4"),
      videoUrl: 'https://youtu.be/LxQLxgPS8S4',
    },
  });

  const exercise12 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Static Squat',
      description: 'Static Squat is a lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      content: "Static Squat is a lower body exercise that targets the quadriceps, hamstrings, and glutes. This exercise is performed by standing with the feet shoulder-width apart and lowering the body into a seated position with the knees at a 90-degree angle. The weight is shifted back into the heels, and the chest is lifted to maintain a neutral spine. Static Squat helps to strengthen the muscles of the lower body, improve balance and stability, and increase overall leg strength. It can be performed with or without weights, depending on the individual’s fitness level and goals.",
      duration: 40,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail('https://youtu.be/JucSY_pgqsw'),
      videoUrl: 'https://youtu.be/JucSY_pgqsw',
    },
  });

  const exercise13 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Side lunges',
      description: 'Side lunges is a lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      content: "Side lunges is a lower body exercise that targets the quadriceps, hamstrings, and glutes. This exercise is performed by standing with the feet wider than shoulder-width apart and stepping to the side with one leg while bending the knee and lowering the body into a lunge position. The weight is shifted back into the heels, and the chest is lifted to maintain a neutral spine. Side lunges help to strengthen the muscles of the lower body, improve balance and stability, and increase overall leg strength. It can be performed with or without weights, depending on the individual’s fitness level and goals.",
      duration: 40,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail('https://youtu.be/g5FToxLJjK8'),
      videoUrl: 'https://youtu.be/g5FToxLJjK8',
    },
  });

  const exercise14 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory1.id,
      title: 'Static cycling',
      description: 'Static cycling is a lower body exercise that targets the quadriceps, hamstrings, and glutes.',
      content: 'Static cycling is a lower body exercise that targets the quadriceps, hamstrings, and glutes. This exercise is performed by sitting on a stationary bike and pedaling at a moderate pace. The resistance can be adjusted to increase or decrease the intensity of the workout. Static cycling helps to strengthen the muscles of the lower body, improve cardiovascular fitness, and burn calories. It can be performed at home or in a gym, depending on the individual’s preference and access to equipment.',
      duration: 30,
      difficulty: ExerciseDifficulty.EASY,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/IkfptqFEW-0"),
      videoUrl: 'https://youtu.be/IkfptqFEW-0',
    },
  });

  const exercise15 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Isometric quadriceps',
      description: 'Isometric quadriceps is a lower body exercise that targets the quadriceps muscles in the front of the thigh.',
      content: "Isometric quadriceps is a lower body exercise that targets the quadriceps muscles in the front of the thigh. This exercise is performed by sitting on a chair with the feet flat on the ground and the knees bent at a 90-degree angle. The hands are placed on the thighs, and the quadriceps muscles are contracted by pressing the thighs down into the hands. Isometric quadriceps helps to strengthen the muscles of the quadriceps, improve knee stability, and prevent injury in the lower body. It can be performed with or without resistance bands, depending on the individual’s fitness level and goals.",
      duration: 45,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/i0TBwMZcSb4"),
      videoUrl: 'https://youtu.be/i0TBwMZcSb4',
    },
  });

  const exercise16 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Seated Leg Straight',
      description: 'Seated Leg Straight is a lower body exercise that targets the quadriceps muscles in the front of the thigh.',
      content: "Seated Leg Straight is a lower body exercise that targets the quadriceps muscles in the front of the thigh. This exercise is performed by sitting on a chair with the feet flat on the ground and the knees bent at a 90-degree angle. The legs are straightened out in front of the body and held in place for a few seconds before returning to the starting position. Seated Leg Straight helps to strengthen the muscles of the quadriceps, improve knee stability, and prevent injury in the lower body. It can be performed with or without ankle weights, depending on the individual’s fitness level and goals.",
      duration: 40,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail('https://youtu.be/sdUNIdsFztE'),
      videoUrl: 'https://youtu.be/sdUNIdsFztE',
    },
  });

  const exercise17 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory1.id,
      title: 'Seated Hamstring stretch',
      description: 'Seated Hamstring stretch is a stretching exercise that targets the hamstring muscles in the back of the thigh.',
      content: 'Seated Hamstring stretch is a stretching exercise that targets the hamstring muscles in the back of the thigh. This exercise is performed by sitting on the edge of a chair with one leg extended straight out in front of the body and the heel on the ground. The toes are flexed towards the body, and the chest is lifted to maintain a neutral spine. Seated Hamstring stretch helps to improve flexibility, reduce muscle tension, and prevent injury in the hamstring muscles. It is commonly used as part of a warm-up or cool-down routine for athletes and fitness enthusiasts.',
      duration: 30,
      difficulty: ExerciseDifficulty.EASY,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/bJjNFAF2qNA"),
      videoUrl: 'https://youtu.be/bJjNFAF2qNA',
    },
  });

  const exercise18 = await prisma.exercise.create({
    data: {
      exerciseCategoryId: exerciseCategory2.id,
      title: 'Single leg stand',
      description: 'Single leg stand is a balance exercise that targets the muscles of the lower body and core.',
      content: "Single leg stand is a balance exercise that targets the muscles of the lower body and core. This exercise is performed by standing on one leg with the knee slightly bent and the foot flat on the ground. The hands can be placed on the hips or out to the sides for balance. Single leg stand helps to improve balance and stability, strengthen the muscles of the lower body, and prevent injury in the legs and hips. It can be performed with or without a balance pad, depending on the individual’s fitness level and goals.",
      duration: 45,
      difficulty: ExerciseDifficulty.MEDIUM,
      thumbnailUrl: getYouTubeThumbnail("https://youtu.be/wRzM1DuUcKE"),
      videoUrl: 'https://youtu.be/wRzM1DuUcKE',
    },
  });

  // Create Patient Exercises
  const patientExercise1 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise1.id,
      sets: 3,
      reps: 3,
      frequency: 3,
      duration: 30,
    },
  });

  const patientExercise2 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise2.id,
      sets: 4,
      reps: 3,
      frequency: 3,
      duration: 30,
    },
  });

  const patientExercise3 = await prisma.patientExercise.create({
    data: {
      patientId: user1.id,
      exerciseId: exercise3.id,
      sets: 2,
      reps: 3,
      frequency: 3,
      duration: 30,
    },
  });

  const patientExercise4 = await prisma.patientExercise.create({
    data: {
      patientId: userDemo.id,
      exerciseId: exercise1.id,
      sets: 3,
      reps: 3,
      frequency: 3,
      duration: 30,
    },
  });

  const patientExercise5 = await prisma.patientExercise.create({
    data: {
      patientId: userDemo.id,
      exerciseId: exercise2.id,
      sets: 4,
      reps: 3,
      frequency: 3,
      duration: 30,
    },
  });

  const patientExercise6 = await prisma.patientExercise.create({
    data: {
      patientId: userDemo.id,
      exerciseId: exercise3.id,
      sets: 2,
      reps: 3,
      frequency: 3,
      duration: 30,
    },
  });

  // Create Daily Patient Exercises
  const currentDate = new Date();
  for (let i = 0; i <= 10; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);

    await prisma.dailyPatientExercise.create({
      data: {
        patientId: user1.id,
        patientExerciseId: patientExercise1.id,
        createdDatetime: date,
        isCompleted: Math.random() < 0.5,
      },
    });

    await prisma.dailyPatientExercise.create({
      data: {
        patientId: user1.id,
        patientExerciseId: patientExercise2.id,
        createdDatetime: date,
        isCompleted: Math.random() < 0.5,
      },
    });

    await prisma.dailyPatientExercise.create({
      data: {
        patientId: user1.id,
        patientExerciseId: patientExercise3.id,
        createdDatetime: date,
        isCompleted: Math.random() < 0.5,
      },
    });

    await prisma.dailyPatientExercise.create({
      data: {
        patientId: userDemo.id,
        patientExerciseId: patientExercise1.id,
        createdDatetime: date,
        isCompleted: true,
      },
    });

    await prisma.dailyPatientExercise.create({
      data: {
        patientId: userDemo.id,
        patientExerciseId: patientExercise2.id,
        createdDatetime: date,
        isCompleted: false,
      },
    });

    await prisma.dailyPatientExercise.create({
      data: {
        patientId: userDemo.id,
        patientExerciseId: patientExercise3.id,
        createdDatetime: date,
        isCompleted: false,
      },
    });
  }

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
