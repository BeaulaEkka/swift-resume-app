-- CreateTable
CREATE TABLE "resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "photoUrl" TEXT,
    "colorHex" TEXT NOT NULL DEFAULT '#000000',
    "borderStyle" TEXT NOT NULL DEFAULT 'squircle',
    "summary" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "jobTitle" TEXT,
    "city" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_experiences" (
    "id" TEXT NOT NULL,
    "position" TEXT,
    "company" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "description" TEXT,
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "startDate" TEXT,
    "endDate" TEXT,
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "work_experiences" ADD CONSTRAINT "work_experiences_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
