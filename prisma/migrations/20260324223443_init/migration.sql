-- CreateEnum
CREATE TYPE "BiologicalSex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('GAIN_MASS', 'DEFINE', 'LOSE_WEIGHT', 'MAINTAIN_WEIGHT');

-- CreateEnum
CREATE TYPE "FocusMuscle" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'FOREARMS', 'CORE', 'ABS', 'OBLIQUES', 'GLUTES', 'QUADRICEPS', 'HAMSTRINGS', 'CALVES', 'ADDUCTORS', 'ABDUCTORS', 'TRAPS', 'LATS', 'LOWER_BACK', 'NECK', 'FULL_BODY');

-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_onboarding_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "goal" "Goal" NOT NULL,
    "biological_sex" "BiologicalSex" NOT NULL,
    "birth_date" DATE NOT NULL,
    "height_in_centimeters" INTEGER NOT NULL,
    "weight_in_grams" INTEGER NOT NULL,
    "target_weight_in_grams" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_nutritions" (
    "id" TEXT NOT NULL,
    "day" DATE NOT NULL,
    "proteins_in_grams" INTEGER NOT NULL DEFAULT 0,
    "carbs_in_grams" INTEGER NOT NULL DEFAULT 0,
    "fats_in_grams" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "daily_nutritions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diets" (
    "id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "proteins_in_grams" INTEGER NOT NULL,
    "carbs_in_grams" INTEGER NOT NULL,
    "fats_in_grams" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "goal" "Goal" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "diets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diet_meals" (
    "id" TEXT NOT NULL,
    "time_in_minutes" INTEGER NOT NULL,
    "total_calories" INTEGER NOT NULL,
    "carbs_in_grams" INTEGER NOT NULL,
    "proteins_in_grams" INTEGER NOT NULL,
    "fats_in_grams" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "diet_id" TEXT NOT NULL,

    CONSTRAINT "diet_meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diet_consumed_foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "weight_per_unit_in_grams" INTEGER NOT NULL,
    "total_calories" INTEGER NOT NULL,
    "cover_image_url" TEXT,
    "diet_meal_id" TEXT NOT NULL,

    CONSTRAINT "diet_consumed_foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weight_histories" (
    "id" TEXT NOT NULL,
    "weight_in_grams" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "weight_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_configs" (
    "id" TEXT NOT NULL,
    "free_days_per_week" INTEGER NOT NULL,
    "free_time_by_day_in_seconds" INTEGER NOT NULL,
    "focus_muscles" "FocusMuscle"[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "workout_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "workout_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "rest_time_in_seconds" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "workout_day_id" TEXT NOT NULL,

    CONSTRAINT "workout_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_days" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_rest" BOOLEAN NOT NULL DEFAULT false,
    "estimated_duration_in_seconds" INTEGER NOT NULL,
    "cover_image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "week_day" "WeekDay" NOT NULL,
    "workout_plan_id" TEXT NOT NULL,

    CONSTRAINT "workout_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sessions" (
    "id" TEXT NOT NULL,
    "started_at" TIMESTAMPTZ NOT NULL,
    "completed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "workout_day_id" TEXT NOT NULL,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_consumptions" (
    "id" TEXT NOT NULL,
    "goal_in_ml" INTEGER NOT NULL DEFAULT 2000,
    "consumed_in_ml" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "water_consumptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_consumption_histories" (
    "id" TEXT NOT NULL,
    "amount_in_ml" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "water_consumption_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_nutritions_user_id_day_key" ON "daily_nutritions"("user_id", "day");

-- CreateIndex
CREATE UNIQUE INDEX "diets_user_id_key" ON "diets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "workout_configs_user_id_key" ON "workout_configs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "water_consumptions_user_id_key" ON "water_consumptions"("user_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_nutritions" ADD CONSTRAINT "daily_nutritions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diets" ADD CONSTRAINT "diets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_meals" ADD CONSTRAINT "diet_meals_diet_id_fkey" FOREIGN KEY ("diet_id") REFERENCES "diets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_consumed_foods" ADD CONSTRAINT "diet_consumed_foods_diet_meal_id_fkey" FOREIGN KEY ("diet_meal_id") REFERENCES "diet_meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_histories" ADD CONSTRAINT "weight_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_configs" ADD CONSTRAINT "workout_configs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_plans" ADD CONSTRAINT "workout_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_workout_day_id_fkey" FOREIGN KEY ("workout_day_id") REFERENCES "workout_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_days" ADD CONSTRAINT "workout_days_workout_plan_id_fkey" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_workout_day_id_fkey" FOREIGN KEY ("workout_day_id") REFERENCES "workout_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_consumptions" ADD CONSTRAINT "water_consumptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_consumption_histories" ADD CONSTRAINT "water_consumption_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
