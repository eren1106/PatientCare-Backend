import { Gender } from "@prisma/client";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // npx prisma db push --force-reset  <= CLEAN ALL TABLE DATA WITH THIS COMMENT


  const optionTemplate1 = await prisma.optionTemplate.create({
    data : { 
      scaleType : 'PAIN_SCALE'
    },
  });

  const optionTemplate2 = await prisma.optionTemplate.create({
    data : { 
      scaleType : 'NUMERIC_SCALE'
    },
  });

  const optionTemplate3 = await prisma.optionTemplate.create({
    data : { 
      scaleType : 'FREQUENCY'
    },
  });
 
  const option = await prisma.option.createMany({
    data: [
      { optionTemplateId : optionTemplate1.id , scaleValue: 1, content: 'None' },
      { optionTemplateId : optionTemplate1.id , scaleValue: 2, content: 'Mild' },
      { optionTemplateId : optionTemplate1.id , scaleValue: 3, content: 'Moderate' },
      { optionTemplateId : optionTemplate1.id , scaleValue: 4, content: 'Severe' },
      { optionTemplateId : optionTemplate1.id , scaleValue: 5, content: 'Extreme' },

      { optionTemplateId : optionTemplate2.id , scaleValue: 1, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 2, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 3, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 4, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 5, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 6, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 7, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 8, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 9, content: null },
      { optionTemplateId : optionTemplate2.id , scaleValue: 10, content: null },

      { optionTemplateId : optionTemplate3.id , scaleValue: 1, content: 'Never' },
      { optionTemplateId : optionTemplate3.id , scaleValue: 2, content: 'Rarely' },
      { optionTemplateId : optionTemplate3.id , scaleValue: 3, content: 'Sometimes' },
      { optionTemplateId : optionTemplate3.id , scaleValue: 4, content: 'Often' },
      { optionTemplateId : optionTemplate3.id , scaleValue: 5, content: 'Always' },
    ]
  });
  
  // Create Admin
  const admin = await prisma.user.create({
    data: {
      username: 'Patient Care Admin',
      email: 'patientcare@admin.com',
      password: 'securepassword',
      signinMethod: 'EMAILPASSWORD',
      profileImageUrl: 'https://external-preview.redd.it/kevin-durant-usa-mens-leading-point-scorer-in-olympic-v0-KlataPnkXqTtYczpASxTqgqJVaxrYZlL3YwsGBLVLuE.jpg?auto=webp&s=66bb76ac0496ece60bf9954b77489fd11f234f1d',
      role: 'ADMIN',
      fullname: 'Admin',
      age: 35,  
      gender: Gender.MALE, 
      ic: "990101123456", 
    },
  });

  // Create Users
  // TODO: hash password
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe_123',
      email: 'john@example.com',
      password: 'securepassword',
      signinMethod: 'EMAILPASSWORD',
      profileImageUrl: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
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
      profileImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5q9GlWCAoQHPpOiDOECuYUeXW9MQP7Ddt-Q&s',
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
      profileImageUrl: 'https://p4.itc.cn/images01/20231219/8d424b652feb4021a31d4a676f7e0cf9.jpeg',
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
      profileImageUrl:'https://atd-blog.s3.us-east-2.amazonaws.com/wp-content/uploads/2022/04/16142821/cool-profile-pictures-for-girls-9.webp',
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
        message: 'Hi user4, do you have time to chat?',
        fromUserId: user2.id,
        toUserId: user4.id,
      },
      {
        message: 'Yes, what do you want to talk about?',
        fromUserId: user4.id,
        toUserId: user2.id,
      },
      {
        message: 'It’s about a collaboration opportunity.',
        fromUserId: user2.id,
        toUserId: user4.id,
      },
      {
        message: 'I’m interested! Let’s discuss more.',
        fromUserId: user4.id,
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
        toUserId: user4.id,
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
    data : {
      name: 'Pain Scale',
      description: 'How severe is your pain? Circle the number that best describes your pain where: 0 = no pain and 10 = the worst pain imaginable. ',
      questionnaireId : questionnaire1.id
    }
  })

  const question1Section1 = await prisma.question.create({
    data : {
      title: 'At its worst?',
      optionId : optionTemplate2.id,
      sectionId : section1Questionnaire1.id
    }
  })

  const question2Section1 = await prisma.question.create({
    data : {
      title: 'When lying on the involved side ?',
      optionId : optionTemplate2.id,
      sectionId : section1Questionnaire1.id
    }
  })

  const question3Section1 = await prisma.question.create({
    data : {
      title: 'Reaching for something on a high shelf ?',
      optionId : optionTemplate2.id,
      sectionId : section1Questionnaire1.id
    }
  })

  const question4Section1 = await prisma.question.create({
    data : {
      title: 'Touching the back of your neck ?',
      optionId : optionTemplate2.id,
      sectionId : section1Questionnaire1.id
    }
  })

  const question5Section1 = await prisma.question.create({
    data : {
      title: 'Pushing with the involved arm ?',
      optionId : optionTemplate2.id,
      sectionId : section1Questionnaire1.id
    }
  })

  const section2Questionnaire1 = await prisma.section.create({
    data : {
      name: 'Disability scale',
      description: 'How much difficulty do you have? Circle the number that best describes your experience where: 0 = no difficulty and 10 = so difficult it requires help. ',
      questionnaireId : questionnaire1.id
    }
  })

  const question1Section2 = await prisma.question.create({
    data : {
      title: 'Washing your hair?',
      optionId : optionTemplate2.id,
      sectionId : section2Questionnaire1.id
    }
  })

  const question2Section2 = await prisma.question.create({
    data : {
      title: 'Washing your back?',
      optionId : optionTemplate2.id,
      sectionId : section2Questionnaire1.id
    }
  })

  const question3Section2 = await prisma.question.create({
    data : {
      title: 'Putting on an undershirt or jumper?',
      optionId : optionTemplate2.id,
      sectionId : section2Questionnaire1.id
    }
  })


  const question5Section2 = await prisma.question.create({
    data : {
      title: 'Putting on a shirt that buttons down the front?',
      optionId : optionTemplate2.id,
      sectionId : section2Questionnaire1.id
    }
  })

  const question6Section2 = await prisma.question.create({
    data : {
      title: 'Putting on your pants?',
      optionId : optionTemplate2.id,
      sectionId : section2Questionnaire1.id
    }
  })

  const question7Section2 = await prisma.question.create({
    data : {
      title: 'Placing an object on a high shelf?',
      optionId : optionTemplate2.id,
      sectionId : section2Questionnaire1.id
    }
  })

  const question8Section2 = await prisma.question.create({
    data : {
      title: 'Carrying a heavy object of 10 pounds (4.5 kilograms)',
      optionId : optionTemplate2.id,
      sectionId : section2Questionnaire1.id
    }
  })

  const question9Section2 = await prisma.question.create({
    data : {
      title: 'Removing something from your back pocket ?',
      optionId : optionTemplate2.id,
      sectionId : section2Questionnaire1.id
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
    data : {
      name: 'Symptoms',
      description: 'Answer these questions thinking of your knee symptoms during the last week. ',
      questionnaireId : questionnaire2.id
    }
  })

  const question1Section1Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Do you have swelling in your knee?',
      optionId : optionTemplate3.id,
      sectionId : section1Questionnaire2.id
    }
  })

  const question2Section1Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Do you feel grinding, hear clicking, or any other type of noise when your knee moves?',
      optionId : optionTemplate3.id,
      sectionId : section1Questionnaire2.id
    }
  })

  const question3Section1Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Does your knee catch or hang up when moving?',
      optionId : optionTemplate3.id,
      sectionId : section1Questionnaire2.id
    }
  })

  const question4Section1Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Can you straighten your knee fully?',
      optionId : optionTemplate3.id,
      sectionId : section1Questionnaire2.id
    }
  })

  const question5Section1Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Can you bend your knee fully?s',
      optionId : optionTemplate3.id,
      sectionId : section1Questionnaire2.id
    }
  })

  const section2Questionnaire2 = await prisma.section.create({
    data : {
      name: 'Stiffness',
      description: 'The following questions concern the amount of joint stiffness you have experienced during the last week in your knee. Stiffness is a sensation of restriction or slowness in the ease with which you move your knee joint.',
      questionnaireId : questionnaire2.id
    }
  })

  const question1Section2Questionnaire2 = await prisma.question.create({
    data : {
      title: 'How severe is your knee joint stiffness after first wakening in the morning?',
      optionId : optionTemplate1.id,
      sectionId : section2Questionnaire2.id
    }
  })

  const question2Section2Questionnaire2 = await prisma.question.create({
    data : {
      title: 'How severe is your knee joint stiffness after sitting, lying, or resting later in the day?',
      optionId : optionTemplate1.id,
      sectionId : section2Questionnaire2.id
    }
  })

  const section3Questionnaire2 = await prisma.section.create({
    data : {
      name: 'Pain',
      description: 'What amount of knee pain have you experienced the last week during the following activities?',
      questionnaireId : questionnaire2.id
    }
  })


  const question1Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'How often do you experience knee pain?',
      optionId : optionTemplate3.id,
      sectionId : section3Questionnaire2.id
    }
  })

  const question2Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Straightening knee fully',
      optionId : optionTemplate3.id,
      sectionId : section3Questionnaire2.id
    }
  })

  const question3Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Twisting/pivoting on your knee',
      optionId : optionTemplate1.id,
      sectionId : section3Questionnaire2.id
    }
  })

  const question4Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'bending knee fully',
      optionId : optionTemplate1.id,
      sectionId : section3Questionnaire2.id
    }
  })
  
  const question5Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Walking on a flat surface',
      optionId : optionTemplate1.id,
      sectionId : section3Questionnaire2.id
    }
  })

  const question6Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Going up or down stairs',
      optionId : optionTemplate1.id,
      sectionId : section3Questionnaire2.id
    }
  })

  const question7Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'At night while in bed',
      optionId : optionTemplate1.id,
      sectionId : section3Questionnaire2.id
    }
  })

  const question8Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Sitting or lying',
      optionId : optionTemplate1.id,
      sectionId : section3Questionnaire2.id
    }
  })

  const question9Section3Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Standing upright',
      optionId : optionTemplate1.id,
      sectionId : section3Questionnaire2.id
    }
  })

  const section4Questionnaire2 = await prisma.section.create({
    data : {
      name: 'Function, Daily Living',
      description: 'This section describes your ability to move around and to look after yourself. For each of the following activities, please indicate the degree of difficulty you have experienced in the last week due to your knee.',
      questionnaireId : questionnaire2.id
    }
  })

  const question1Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Descending stairs',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question2Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Ascending stairs',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question3Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Rising from sitting',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question4Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Standing',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question5Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Bending to the floor/pick up an object',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question6Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Walking on a flat surface',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question7Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Getting in/out of a car',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question8Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Going shopping',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question9Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Putting on socks/stockings',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question10Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Rising from bed',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question11Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Taking off socks/stockings',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })


  const question12Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Lying in bed (turning over, maintaining knee position)',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question13Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Getting in/out of bath',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question14Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Sitting',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const question15Section4Questionnaire2 = await prisma.question.create({
    data : {
      title: 'Getting on/off toilet',
      optionId : optionTemplate1.id,
      sectionId : section4Questionnaire2.id
    }
  })

  const questionsSection4Questionnaire2 = await prisma.question.createMany({
    data : [
      {title:'Heavy domestic duties (moving heavy boxes, scrubbing floors, etc)', optionId : optionTemplate1.id, sectionId : section4Questionnaire2.id},
      {title:'Light domestic duties (cooking, dusting, etc)', optionId : optionTemplate1.id, sectionId : section4Questionnaire2.id}
    ]
  })

  const section5Questionnaire2 = await prisma.section.create({
    data : {
      name: 'Function, Sports and Recreational Activities',
      description: 'This section describes your ability to be active on a higher level. For each of the following activities, please indicate the degree of difficulty you have experienced in the last week due to your knee.',
      questionnaireId : questionnaire2.id
    }
  })

  const questionsSection5Questionnaire2 = await prisma.question.createMany({
    data : [
      {title:'Suqatting ', optionId : optionTemplate1.id, sectionId : section5Questionnaire2.id},
      {title:'Running ', optionId : optionTemplate1.id, sectionId : section5Questionnaire2.id},
      {title:'Jumping ', optionId : optionTemplate1.id, sectionId : section5Questionnaire2.id},
      {title:'Twisting/pivoting on your injured knee ', optionId : optionTemplate1.id, sectionId : section5Questionnaire2.id},
      {title:'Kneeling ', optionId : optionTemplate1.id, sectionId : section5Questionnaire2.id}
    ]
  })

  const section6Questionnaire2 = await prisma.section.create({
    data : {
      name: 'Quality of Life',
      description: '',
      questionnaireId : questionnaire2.id
    }
  })

  const questionsSection6Questionnaire2 = await prisma.question.createMany({
    data : [
      {title:'How often are you aware of your knee problem?', optionId : optionTemplate3.id, sectionId : section6Questionnaire2.id},
      {title:'Have you modified your life style to avoid activities potentially damaging to your knee?', optionId : optionTemplate3.id, sectionId : section6Questionnaire2.id},
      {title:'How much are you troubled with lack of confidence in your knee?', optionId : optionTemplate3.id, sectionId : section6Questionnaire2.id},
      {title:' In general, how much difficulty do you have with your knee?', optionId : optionTemplate3.id, sectionId : section6Questionnaire2.id},
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
    },
  });

  const assessment2 = await prisma.assessment.create({
    data: {
      doctorId: user2.id,
      questionnaireId: questionnaire2.id,
      patientRecordId: patientRecord1.id,
    },
  });

  // Find options to be reference in the response
  const option1 = await prisma.option.findFirst({
    where: {
      scaleValue: 5,
      content: null
    },
  });

  const option2 = await prisma.option.findFirst({
    where: {
      scaleValue: 7,
      content: null
    },
  });

  const option3 = await prisma.option.findFirst({
    where: {
      scaleValue: 10,
      content: null
    },
  });

  const option4 = await prisma.option.findFirst({
    where: {
      scaleValue: 1,
      content: null
    },
  });

  // Create Responses
  // TODO: uncomment and fix these errors
  // const response1 = await prisma.response.create({
  //   data: {
  //     questionId: question1Section1.id,
  //     assessmentId: assessment1.id,
  //     optionId: option1.id,
  //   },
  // });

  // const response2 = await prisma.response.create({
  //   data: {
  //     questionId: question2Section1.id,
  //     assessmentId: assessment1.id,
  //     optionId: option2.id,
  //   },
  // });

  // const response3 = await prisma.response.create({
  //   data: {
  //     questionId: question3Section1.id,
  //     assessmentId: assessment1.id,
  //     optionId: option3.id,
  //   },
  // });

  // const response4 = await prisma.response.create({
  //   data: {
  //     questionId: question4Section1.id,
  //     assessmentId: assessment1.id,
  //     optionId: option4.id,
  //   },
  // });

  // const response5 = await prisma.response.create({
  //   data: {
  //     questionId: question5Section1.id,
  //     assessmentId: assessment1.id,
  //     optionId: option4.id,
  //   },
  // });

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
