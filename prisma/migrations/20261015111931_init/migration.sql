-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_posts` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `sub_title` VARCHAR(191) NULL,
    `tag` VARCHAR(191) NULL,
    `body` LONGTEXT NOT NULL,
    `published` BOOLEAN NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `blog_posts_slug_key`(`slug`),
    INDEX `blog_posts_author_id_idx`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `login_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,

    INDEX `leads_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `comment` TEXT NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,

    INDEX `comments_post_id_idx`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_us` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `looking_for` VARCHAR(191) NULL,
    `budget` VARCHAR(191) NULL,
    `due_date` DATETIME(3) NULL,
    `address` JSON NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `contact_us_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `careers` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `portfolio` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `company` VARCHAR(191) NULL,
    `experience_years` VARCHAR(191) NOT NULL,
    `current_ctc` VARCHAR(191) NOT NULL,
    `expected_ctc` VARCHAR(191) NOT NULL,
    `notice_period` VARCHAR(191) NULL,
    `resume_uri` VARCHAR(191) NULL,
    `resume_type` VARCHAR(191) NULL,
    `resume_name` VARCHAR(191) NULL,
    `resume_size` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `careers_uuid_key`(`uuid`),
    UNIQUE INDEX `careers_email_key`(`email`),
    INDEX `careers_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `employee_types` JSON NOT NULL,
    `employment_categories` JSON NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `jobs_uuid_key`(`uuid`),
    UNIQUE INDEX `jobs_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_titles` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `job_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `job_titles_uuid_key`(`uuid`),
    INDEX `job_titles_job_id_idx`(`job_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `context` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `experience_years` INTEGER NOT NULL,
    `importance` VARCHAR(191) NOT NULL,
    `is_validated` BOOLEAN NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `skills_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_locations` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `is_current` BOOLEAN NOT NULL,
    `priority` INTEGER NOT NULL,
    `address` JSON NOT NULL,

    UNIQUE INDEX `work_locations_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education_requirements` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `degree_types` JSON NOT NULL,
    `importance` VARCHAR(191) NOT NULL,
    `job_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `education_requirements_uuid_key`(`uuid`),
    INDEX `education_requirements_job_id_idx`(`job_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_classifications` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `environment` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `sub_category` VARCHAR(191) NOT NULL,
    `job_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `job_classifications_uuid_key`(`uuid`),
    UNIQUE INDEX `job_classifications_job_id_key`(`job_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_descriptions` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `qualifications` LONGTEXT NOT NULL,
    `responsibilities` LONGTEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `job_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `job_descriptions_uuid_key`(`uuid`),
    INDEX `job_descriptions_job_id_idx`(`job_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benefits` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `context` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `job_description_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `benefits_uuid_key`(`uuid`),
    INDEX `benefits_job_description_id_idx`(`job_description_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_skills` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `job_id` VARCHAR(191) NOT NULL,
    `skill_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `job_skills_uuid_key`(`uuid`),
    INDEX `job_skills_skill_id_idx`(`skill_id`),
    UNIQUE INDEX `job_skills_job_id_skill_id_key`(`job_id`, `skill_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_work_locations` (
    `id` VARCHAR(191) NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `job_id` VARCHAR(191) NOT NULL,
    `work_location_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `job_work_locations_uuid_key`(`uuid`),
    INDEX `job_work_locations_work_location_id_idx`(`work_location_id`),
    UNIQUE INDEX `job_work_locations_job_id_work_location_id_key`(`job_id`, `work_location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `badge` VARCHAR(191) NULL,
    `heading` VARCHAR(191) NULL,
    `heading_accent` VARCHAR(191) NULL,
    `intro` TEXT NULL,
    `sections` JSON NULL,
    `cta_label` VARCHAR(191) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `services_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `case_studies` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `heading_accent` VARCHAR(191) NULL,
    `tag` VARCHAR(191) NULL,
    `card_tags` JSON NULL,
    `project_description` TEXT NULL,
    `card_description` TEXT NULL,
    `intro` TEXT NULL,
    `service_tags` JSON NULL,
    `highlights` JSON NULL,
    `sections` JSON NULL,
    `cta_label` VARCHAR(191) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `case_studies_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_settings` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `site_settings_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blog_posts` ADD CONSTRAINT `blog_posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leads` ADD CONSTRAINT `leads_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `blog_posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_titles` ADD CONSTRAINT `job_titles_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `education_requirements` ADD CONSTRAINT `education_requirements_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_classifications` ADD CONSTRAINT `job_classifications_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_descriptions` ADD CONSTRAINT `job_descriptions_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `benefits` ADD CONSTRAINT `benefits_job_description_id_fkey` FOREIGN KEY (`job_description_id`) REFERENCES `job_descriptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_skills` ADD CONSTRAINT `job_skills_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_skills` ADD CONSTRAINT `job_skills_skill_id_fkey` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_work_locations` ADD CONSTRAINT `job_work_locations_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_work_locations` ADD CONSTRAINT `job_work_locations_work_location_id_fkey` FOREIGN KEY (`work_location_id`) REFERENCES `work_locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
