/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appointment_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `created_datetime` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `doctor_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_datetime` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_datetime` on the `Appointment` table. All the data in the column will be lost.
  - The primary key for the `Assessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assessment_id` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `created_datetime` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `questionnaire_id` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `response_id` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Assessment` table. All the data in the column will be lost.
  - The primary key for the `Call` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `call_id` on the `Call` table. All the data in the column will be lost.
  - You are about to drop the column `created_datetime` on the `Call` table. All the data in the column will be lost.
  - You are about to drop the column `from_user_id` on the `Call` table. All the data in the column will be lost.
  - You are about to drop the column `to_user_id` on the `Call` table. All the data in the column will be lost.
  - The primary key for the `DoctorValidation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `doctor_id` on the `DoctorValidation` table. All the data in the column will be lost.
  - You are about to drop the column `doctor_validation_id` on the `DoctorValidation` table. All the data in the column will be lost.
  - You are about to drop the column `identity_image_url` on the `DoctorValidation` table. All the data in the column will be lost.
  - You are about to drop the column `registration_number` on the `DoctorValidation` table. All the data in the column will be lost.
  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_datetime` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_category_id` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_id` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `updated_datetime` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `Exercise` table. All the data in the column will be lost.
  - The primary key for the `ExerciseCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_img` on the `ExerciseCategory` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_category_id` on the `ExerciseCategory` table. All the data in the column will be lost.
  - The primary key for the `FieldType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `field_type_id` on the `FieldType` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_datetime` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `from_user_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `message_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `to_user_id` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_datetime` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `notification_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `redirect_url` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `PatientExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `completed_datetime` on the `PatientExercise` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_id` on the `PatientExercise` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `PatientExercise` table. All the data in the column will be lost.
  - You are about to drop the column `patient_exercise_id` on the `PatientExercise` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `PatientExercise` table. All the data in the column will be lost.
  - The primary key for the `PatientRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_datetime` on the `PatientRecord` table. All the data in the column will be lost.
  - You are about to drop the column `doctor_id` on the `PatientRecord` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `PatientRecord` table. All the data in the column will be lost.
  - You are about to drop the column `patient_record_id` on the `PatientRecord` table. All the data in the column will be lost.
  - You are about to drop the column `updated_datetime` on the `PatientRecord` table. All the data in the column will be lost.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `field_type_id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `Questionnaire` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author_id` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `created_datetime` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `questionnaire_id` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `respondent_id` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `updated_datetime` on the `Questionnaire` table. All the data in the column will be lost.
  - The primary key for the `Response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `question_id` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `response_id` on the `Response` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assigned_doctors` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_datetime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_login_datetime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signin_method` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_datetime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId]` on the table `DoctorValidation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[doctorId,patientId]` on the table `PatientRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctorId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledDatetime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionnaireId` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseId` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromUserId` to the `Call` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `Call` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `DoctorValidation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNumber` to the `DoctorValidation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseCategoryId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromUserId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `PatientExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PatientExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `PatientRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `PatientRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldTypeId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Questionnaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respondentId` to the `Questionnaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signinMethod` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctor_id_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_questionnaire_id_fkey";

-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_response_id_fkey";

-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_from_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_to_user_id_fkey";

-- DropForeignKey
ALTER TABLE "DoctorValidation" DROP CONSTRAINT "DoctorValidation_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_exercise_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_from_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_to_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientExercise" DROP CONSTRAINT "PatientExercise_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientExercise" DROP CONSTRAINT "PatientExercise_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientRecord" DROP CONSTRAINT "PatientRecord_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientRecord" DROP CONSTRAINT "PatientRecord_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_field_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_question_id_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToPatientRecord" DROP CONSTRAINT "_ExerciseToPatientRecord_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToPatientRecord" DROP CONSTRAINT "_ExerciseToPatientRecord_B_fkey";

-- DropForeignKey
ALTER TABLE "_PatientRecordAssessment" DROP CONSTRAINT "_PatientRecordAssessment_A_fkey";

-- DropForeignKey
ALTER TABLE "_PatientRecordAssessment" DROP CONSTRAINT "_PatientRecordAssessment_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionnaireQuestion" DROP CONSTRAINT "_QuestionnaireQuestion_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionnaireQuestion" DROP CONSTRAINT "_QuestionnaireQuestion_B_fkey";

-- DropIndex
DROP INDEX "DoctorValidation_doctor_id_key";

-- DropIndex
DROP INDEX "PatientRecord_doctor_id_patient_id_key";

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
DROP COLUMN "appointment_id",
DROP COLUMN "created_datetime",
DROP COLUMN "doctor_id",
DROP COLUMN "patient_id",
DROP COLUMN "scheduled_datetime",
DROP COLUMN "updated_datetime",
ADD COLUMN     "appointmentId" SERIAL NOT NULL,
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doctorId" INTEGER NOT NULL,
ADD COLUMN     "patientId" INTEGER NOT NULL,
ADD COLUMN     "scheduledDatetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedDatetime" TIMESTAMP(3),
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("appointmentId");

-- AlterTable
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_pkey",
DROP COLUMN "assessment_id",
DROP COLUMN "created_datetime",
DROP COLUMN "questionnaire_id",
DROP COLUMN "response_id",
DROP COLUMN "user_id",
ADD COLUMN     "assessmentId" SERIAL NOT NULL,
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "questionnaireId" INTEGER NOT NULL,
ADD COLUMN     "responseId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Assessment_pkey" PRIMARY KEY ("assessmentId");

-- AlterTable
ALTER TABLE "Call" DROP CONSTRAINT "Call_pkey",
DROP COLUMN "call_id",
DROP COLUMN "created_datetime",
DROP COLUMN "from_user_id",
DROP COLUMN "to_user_id",
ADD COLUMN     "callId" SERIAL NOT NULL,
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fromUserId" INTEGER NOT NULL,
ADD COLUMN     "toUserId" INTEGER NOT NULL,
ADD CONSTRAINT "Call_pkey" PRIMARY KEY ("callId");

-- AlterTable
ALTER TABLE "DoctorValidation" DROP CONSTRAINT "DoctorValidation_pkey",
DROP COLUMN "doctor_id",
DROP COLUMN "doctor_validation_id",
DROP COLUMN "identity_image_url",
DROP COLUMN "registration_number",
ADD COLUMN     "doctorId" INTEGER NOT NULL,
ADD COLUMN     "doctorValidationId" SERIAL NOT NULL,
ADD COLUMN     "identityImageUrl" TEXT,
ADD COLUMN     "registrationNumber" TEXT NOT NULL,
ADD CONSTRAINT "DoctorValidation_pkey" PRIMARY KEY ("doctorValidationId");

-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
DROP COLUMN "created_datetime",
DROP COLUMN "exercise_category_id",
DROP COLUMN "exercise_id",
DROP COLUMN "updated_datetime",
DROP COLUMN "video_url",
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exerciseCategoryId" INTEGER NOT NULL,
ADD COLUMN     "exerciseId" SERIAL NOT NULL,
ADD COLUMN     "updatedDatetime" TIMESTAMP(3),
ADD COLUMN     "videoUrl" TEXT,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("exerciseId");

-- AlterTable
ALTER TABLE "ExerciseCategory" DROP CONSTRAINT "ExerciseCategory_pkey",
DROP COLUMN "category_img",
DROP COLUMN "exercise_category_id",
ADD COLUMN     "categoryImg" TEXT,
ADD COLUMN     "exerciseCategoryId" SERIAL NOT NULL,
ADD CONSTRAINT "ExerciseCategory_pkey" PRIMARY KEY ("exerciseCategoryId");

-- AlterTable
ALTER TABLE "FieldType" DROP CONSTRAINT "FieldType_pkey",
DROP COLUMN "field_type_id",
ADD COLUMN     "fieldTypeId" SERIAL NOT NULL,
ADD CONSTRAINT "FieldType_pkey" PRIMARY KEY ("fieldTypeId");

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "created_datetime",
DROP COLUMN "from_user_id",
DROP COLUMN "message_id",
DROP COLUMN "to_user_id",
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fromUserId" INTEGER NOT NULL,
ADD COLUMN     "messageId" SERIAL NOT NULL,
ADD COLUMN     "toUserId" INTEGER NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "created_datetime",
DROP COLUMN "notification_id",
DROP COLUMN "redirect_url",
DROP COLUMN "user_id",
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notificationId" SERIAL NOT NULL,
ADD COLUMN     "redirectUrl" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId");

-- AlterTable
ALTER TABLE "PatientExercise" DROP CONSTRAINT "PatientExercise_pkey",
DROP COLUMN "completed_datetime",
DROP COLUMN "exercise_id",
DROP COLUMN "is_completed",
DROP COLUMN "patient_exercise_id",
DROP COLUMN "user_id",
ADD COLUMN     "completedDatetime" TIMESTAMP(3),
ADD COLUMN     "exerciseId" INTEGER NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "patientExerciseId" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "PatientExercise_pkey" PRIMARY KEY ("patientExerciseId");

-- AlterTable
ALTER TABLE "PatientRecord" DROP CONSTRAINT "PatientRecord_pkey",
DROP COLUMN "created_datetime",
DROP COLUMN "doctor_id",
DROP COLUMN "patient_id",
DROP COLUMN "patient_record_id",
DROP COLUMN "updated_datetime",
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doctorId" INTEGER NOT NULL,
ADD COLUMN     "patientId" INTEGER NOT NULL,
ADD COLUMN     "patientRecordId" SERIAL NOT NULL,
ADD COLUMN     "updatedDatetime" TIMESTAMP(3),
ADD CONSTRAINT "PatientRecord_pkey" PRIMARY KEY ("patientRecordId");

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "field_type_id",
DROP COLUMN "question_id",
ADD COLUMN     "fieldTypeId" INTEGER NOT NULL,
ADD COLUMN     "questionId" SERIAL NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("questionId");

-- AlterTable
ALTER TABLE "Questionnaire" DROP CONSTRAINT "Questionnaire_pkey",
DROP COLUMN "author_id",
DROP COLUMN "created_datetime",
DROP COLUMN "questionnaire_id",
DROP COLUMN "respondent_id",
DROP COLUMN "updated_datetime",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "questionnaireId" SERIAL NOT NULL,
ADD COLUMN     "respondentId" INTEGER NOT NULL,
ADD COLUMN     "updatedDatetime" TIMESTAMP(3),
ADD CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("questionnaireId");

-- AlterTable
ALTER TABLE "Response" DROP CONSTRAINT "Response_pkey",
DROP COLUMN "question_id",
DROP COLUMN "response_id",
ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD COLUMN     "responseId" SERIAL NOT NULL,
ADD CONSTRAINT "Response_pkey" PRIMARY KEY ("responseId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "assigned_doctors",
DROP COLUMN "created_datetime",
DROP COLUMN "last_login_datetime",
DROP COLUMN "profile_image_url",
DROP COLUMN "signin_method",
DROP COLUMN "updated_datetime",
DROP COLUMN "user_id",
ADD COLUMN     "assignedDoctors" TEXT,
ADD COLUMN     "createdDatetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastLoginDatetime" TIMESTAMP(3),
ADD COLUMN     "profileImageUrl" TEXT,
ADD COLUMN     "signinMethod" TEXT NOT NULL,
ADD COLUMN     "updatedDatetime" TIMESTAMP(3),
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorValidation_doctorId_key" ON "DoctorValidation"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientRecord_doctorId_patientId_key" ON "PatientRecord"("doctorId", "patientId");

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("questionnaireId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("responseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_fieldTypeId_fkey" FOREIGN KEY ("fieldTypeId") REFERENCES "FieldType"("fieldTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorValidation" ADD CONSTRAINT "DoctorValidation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientRecord" ADD CONSTRAINT "PatientRecord_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientRecord" ADD CONSTRAINT "PatientRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_patientId_fkey" FOREIGN KEY ("doctorId", "patientId") REFERENCES "PatientRecord"("doctorId", "patientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_exerciseCategoryId_fkey" FOREIGN KEY ("exerciseCategoryId") REFERENCES "ExerciseCategory"("exerciseCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientExercise" ADD CONSTRAINT "PatientExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientExercise" ADD CONSTRAINT "PatientExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("exerciseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientRecordAssessment" ADD CONSTRAINT "_PatientRecordAssessment_A_fkey" FOREIGN KEY ("A") REFERENCES "Assessment"("assessmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientRecordAssessment" ADD CONSTRAINT "_PatientRecordAssessment_B_fkey" FOREIGN KEY ("B") REFERENCES "PatientRecord"("patientRecordId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionnaireQuestion" ADD CONSTRAINT "_QuestionnaireQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("questionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionnaireQuestion" ADD CONSTRAINT "_QuestionnaireQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Questionnaire"("questionnaireId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToPatientRecord" ADD CONSTRAINT "_ExerciseToPatientRecord_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("exerciseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToPatientRecord" ADD CONSTRAINT "_ExerciseToPatientRecord_B_fkey" FOREIGN KEY ("B") REFERENCES "PatientRecord"("patientRecordId") ON DELETE CASCADE ON UPDATE CASCADE;
