-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "signin_method" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "profile_image_url" TEXT,
    "assigned_doctors" TEXT,
    "last_login_datetime" TIMESTAMP(3),
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_datetime" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Call" (
    "call_id" SERIAL NOT NULL,
    "to_user_id" INTEGER NOT NULL,
    "from_user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("call_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "message_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "from_user_id" INTEGER NOT NULL,
    "to_user_id" INTEGER NOT NULL,
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "redirect_url" TEXT,
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "assessment_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "questionnaire_id" INTEGER NOT NULL,
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response_id" INTEGER NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("assessment_id")
);

-- CreateTable
CREATE TABLE "Questionnaire" (
    "questionnaire_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "respondent_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_datetime" TIMESTAMP(3),

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("questionnaire_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "field_type_id" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Response" (
    "response_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("response_id")
);

-- CreateTable
CREATE TABLE "FieldType" (
    "field_type_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FieldType_pkey" PRIMARY KEY ("field_type_id")
);

-- CreateTable
CREATE TABLE "DoctorValidation" (
    "doctor_validation_id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "registration_number" TEXT NOT NULL,
    "identity_image_url" TEXT,

    CONSTRAINT "DoctorValidation_pkey" PRIMARY KEY ("doctor_validation_id")
);

-- CreateTable
CREATE TABLE "PatientRecord" (
    "patient_record_id" SERIAL NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_datetime" TIMESTAMP(3),

    CONSTRAINT "PatientRecord_pkey" PRIMARY KEY ("patient_record_id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "appointment_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduled_datetime" TIMESTAMP(3) NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_datetime" TIMESTAMP(3),

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("appointment_id")
);

-- CreateTable
CREATE TABLE "ExerciseCategory" (
    "exercise_category_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category_img" TEXT,

    CONSTRAINT "ExerciseCategory_pkey" PRIMARY KEY ("exercise_category_id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "exercise_id" SERIAL NOT NULL,
    "exercise_category_id" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "video_url" TEXT,
    "created_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_datetime" TIMESTAMP(3),

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("exercise_id")
);

-- CreateTable
CREATE TABLE "PatientExercise" (
    "patient_exercise_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_datetime" TIMESTAMP(3),

    CONSTRAINT "PatientExercise_pkey" PRIMARY KEY ("patient_exercise_id")
);

-- CreateTable
CREATE TABLE "_PatientRecordAssessment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionnaireQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToPatientRecord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorValidation_doctor_id_key" ON "DoctorValidation"("doctor_id");

-- CreateIndex
CREATE UNIQUE INDEX "PatientRecord_doctor_id_patient_id_key" ON "PatientRecord"("doctor_id", "patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientRecordAssessment_AB_unique" ON "_PatientRecordAssessment"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientRecordAssessment_B_index" ON "_PatientRecordAssessment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionnaireQuestion_AB_unique" ON "_QuestionnaireQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionnaireQuestion_B_index" ON "_QuestionnaireQuestion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToPatientRecord_AB_unique" ON "_ExerciseToPatientRecord"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToPatientRecord_B_index" ON "_ExerciseToPatientRecord"("B");

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_questionnaire_id_fkey" FOREIGN KEY ("questionnaire_id") REFERENCES "Questionnaire"("questionnaire_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "Response"("response_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_field_type_id_fkey" FOREIGN KEY ("field_type_id") REFERENCES "FieldType"("field_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorValidation" ADD CONSTRAINT "DoctorValidation_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientRecord" ADD CONSTRAINT "PatientRecord_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientRecord" ADD CONSTRAINT "PatientRecord_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctor_id_patient_id_fkey" FOREIGN KEY ("doctor_id", "patient_id") REFERENCES "PatientRecord"("doctor_id", "patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_exercise_category_id_fkey" FOREIGN KEY ("exercise_category_id") REFERENCES "ExerciseCategory"("exercise_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientExercise" ADD CONSTRAINT "PatientExercise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientExercise" ADD CONSTRAINT "PatientExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("exercise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientRecordAssessment" ADD CONSTRAINT "_PatientRecordAssessment_A_fkey" FOREIGN KEY ("A") REFERENCES "Assessment"("assessment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientRecordAssessment" ADD CONSTRAINT "_PatientRecordAssessment_B_fkey" FOREIGN KEY ("B") REFERENCES "PatientRecord"("patient_record_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionnaireQuestion" ADD CONSTRAINT "_QuestionnaireQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionnaireQuestion" ADD CONSTRAINT "_QuestionnaireQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Questionnaire"("questionnaire_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToPatientRecord" ADD CONSTRAINT "_ExerciseToPatientRecord_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("exercise_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToPatientRecord" ADD CONSTRAINT "_ExerciseToPatientRecord_B_fkey" FOREIGN KEY ("B") REFERENCES "PatientRecord"("patient_record_id") ON DELETE CASCADE ON UPDATE CASCADE;
