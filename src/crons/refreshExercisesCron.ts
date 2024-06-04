import prisma from "../lib/prisma";

export const createNewDailyPatientExercises = async () => {
  try {
    // Get all patient records
    const patientRecords = await prisma.patientRecord.findMany({
      include: {
        exercise: true,
        patient: {
          include: {
            patientExercise: true
          }
        }
      }
    });

    // Loop through each patient record
    for (const record of patientRecords) {
      const { patient } = record;

      // Loop through each patient exercise for the patient
      for (const patientExercise of patient.patientExercise) {
        // Create a new DailyPatientExercise entry
        await prisma.dailyPatientExercise.create({
          data: {
            patientId: patient.id,
            patientExerciseId: patientExercise.id,
            isCompleted: false,
            createdDatetime: new Date(),
          }
        });
      }
    }
    
    console.log("CRON JOB: Daily patient exercises created successfully.")
  } catch (e) {
    console.error(e);
  }
};