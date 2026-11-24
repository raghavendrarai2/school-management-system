/**
 * Rahav Public School - Data Store & Dummy State
 * Location: Gorakhpur - Kushinagar Highway (NH-28), Uttar Pradesh
 * Affiliation: CBSE Affiliation No. 2132984 | School Code: 71092
 */

window.SchoolData = {
  schoolInfo: {
    name: "Rahav Public School",
    hindiName: "राघव पब्लिक स्कूल",
    tagline: "Empowering Minds, Shaping Tomorrow • Gorakhpur - Kushinagar",
    hindiTagline: "संस्कार, ज्ञान एवं आधुनिक तकनीक का संगम",
    affiliation: "CBSE Affiliated (Senior Secondary, 10+2)",
    code: "CBSE Affil. No. 2132984 | School Code: 71092",
    address: "NH-28 Highway, Near Buddha Marg, Gorakhpur-Kushinagar Border, UP - 274403",
    phone: "+91 94520 88910 / +91 91250 44321",
    email: "info@rahavpublicschool.edu.in",
    website: "www.rahavpublicschool.edu.in",
    established: "2010",
    principalName: "Dr. Surendra K. Mishra (M.Sc., Ph.D., B.Ed.)",
    totalStudents: 1420,
    totalTeachers: 58,
    activeClasses: "Pre-Nursery to 12th (Science, Commerce, Humanities)",
    campusArea: "10.5 Acres Green Smart Campus"
  },

  // Available user roles for dynamic switching
  users: {
    super_admin: {
      id: "usr_super_admin",
      role: "super_admin",
      name: "Er. Raghavendra Singh",
      title: "School Founder & Chairman",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      email: "chairman@rahavpublicschool.edu.in",
      phone: "+91 94520 88900",
      badge: "Super Admin (School Owner)",
      permissions: ["onboard_staff", "assign_staff_roles", "payroll", "all_complaints", "institutional_governance"]
    },
    admin: {
      id: "usr_admin",
      role: "admin",
      name: "Anand Mishra",
      title: "Registrar & Fee Accounts Officer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      email: "admin@rahavpublicschool.edu.in",
      phone: "+91 94520 88901",
      badge: "Admin (Admissions & Fees)",
      permissions: ["onboard_student_parent", "collect_fees", "manage_students", "admissions", "fee_receipts"]
    },
    principal: {
      id: "usr_principal",
      role: "principal",
      name: "Dr. Surendra K. Mishra",
      title: "Principal & Senior Physics Mentor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      email: "principal@rahavpublicschool.edu.in",
      phone: "+91 94520 88902",
      badge: "Head of Institution",
      isAlsoTeacher: true,
      teachingSubject: "Class 12th Physics (Advanced)",
      permissions: ["academics", "timetable", "exams", "teachers", "students", "approvals"]
    },
    teacher: {
      id: "usr_teacher",
      role: "teacher",
      name: "Mrs. Sunita Verma",
      title: "Class Teacher (Class 10-A) & TGT Mathematics",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      email: "sunita.verma@rahavpublicschool.edu.in",
      phone: "+91 98391 12345",
      badge: "Class Teacher (10-A In-Charge)",
      isClassTeacher: true, // Responsible for whole class: daily attendance, marksheets, PTM, leaves, complaints
      assignedClass: "10-A",
      subjects: ["Mathematics (10-A, 10-B)", "Vedic Maths"],
      permissions: ["class_attendance", "class_marksheet", "ptm", "leave_approval", "complaints", "homework", "marks", "parent_notice"]
    },
    subject_teacher: {
      id: "usr_subject_teacher",
      role: "subject_teacher",
      name: "Mr. Rohit Pandey",
      title: "PGT English & Language Mentor",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      email: "rohit.pandey@rahavpublicschool.edu.in",
      phone: "+91 98380 99887",
      badge: "Subject Teacher (English 10-A, 12th)",
      isClassTeacher: false, // NOT a class teacher! Only teaches assigned subject & marks
      assignedClass: "None (Subject Teacher Only)",
      subjects: ["English Language & Lit (10-A, 12th)"],
      permissions: ["classes", "homework", "marks"]
    },
    parent: {
      id: "usr_parent",
      role: "parent",
      name: "Mr. Rajesh Sharma",
      title: "Parent / Guardian",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      email: "rajesh.sharma.gkp@gmail.com",
      phone: "+91 94152 77889",
      badge: "Parent of Aarav (10-A)",
      child: {
        name: "Aarav Sharma",
        class: "10th - Section A",
        rollNo: 14,
        admissionNo: "RPS-2021-084",
        dob: "12 Oct 2011",
        bloodGroup: "O+",
        house: "Tagore House (Blue)"
      }
    },
    student: {
      id: "usr_student",
      role: "student",
      name: "Aarav Sharma",
      title: "Student (Class 10-A)",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      email: "aarav.10a@rahavpublicschool.edu.in",
      phone: "+91 94152 77889",
      badge: "Student • Roll No 14",
      class: "10th - Section A",
      rollNo: 14,
      admissionNo: "RPS-2021-084",
      house: "Tagore House",
      rank: "3rd in Class",
      attendanceRate: "94.5%"
    }
  },

  // Student & Class Schedule (Weekly Timetable)
  classTimetable: [
    { period: "1", time: "08:00 AM - 08:45 AM", subject: "Mathematics", teacher: "Mrs. Sunita Verma", room: "Room 204", day: "Mon-Sat" },
    { period: "2", time: "08:45 AM - 09:30 AM", subject: "Science (Physics)", teacher: "Dr. S. K. Mishra", room: "Physics Lab 1", day: "Mon-Sat" },
    { period: "3", time: "09:30 AM - 10:15 AM", subject: "English Literature", teacher: "Mr. Rohit Pandey", room: "Room 204", day: "Mon-Sat" },
    { period: "Break", time: "10:15 AM - 10:35 AM", subject: "Recess / Tiffin Break", teacher: "-", room: "Cafeteria / Ground", isBreak: true },
    { period: "4", time: "10:35 AM - 11:20 AM", subject: "Social Science (History)", teacher: "Ms. Priyanka Tiwari", room: "Room 204", day: "Mon-Sat" },
    { period: "5", time: "11:20 AM - 12:05 PM", subject: "Hindi (साहित्य)", teacher: "Pandit Ramakant Ji", room: "Room 204", day: "Mon-Sat" },
    { period: "6", time: "12:05 PM - 12:50 PM", subject: "Computer Applications / AI", teacher: "Er. Deepak Gupta", room: "Smart Lab B", day: "Mon-Sat" },
    { period: "7", time: "12:50 PM - 01:30 PM", subject: "Sports / Yoga / Library", teacher: "Coach Mahendra Yadav", room: "Sports Ground", day: "Mon-Sat" }
  ],

  // Homework Records
  homeworkList: [
    {
      id: "hw_101",
      subject: "Mathematics",
      teacher: "Mrs. Sunita Verma",
      title: "Quadratic Equations - Ex 4.3 & Word Problems",
      description: "Solve questions 1 to 8 from NCERT chapter 4. Practice real-life discriminant problems.",
      assignedDate: "2026-11-23",
      dueDate: "2026-11-26",
      status: "Pending", // Pending, Submitted, Evaluated
      hasAttachment: true,
      attachmentName: "Quadratic_Practice_Sheet.pdf",
      maxMarks: 10
    },
    {
      id: "hw_102",
      subject: "Science",
      teacher: "Dr. S. K. Mishra",
      title: "Light: Reflection & Refraction - Ray Diagrams",
      description: "Draw neat ray diagrams for concave and convex mirrors for all 6 object positions.",
      assignedDate: "2026-11-22",
      dueDate: "2026-11-25",
      status: "Submitted",
      submittedDate: "2026-11-24 09:30 AM",
      hasAttachment: true,
      attachmentName: "Ray_Diagrams_Aarav.pdf",
      maxMarks: 10,
      obtainedMarks: 9.5,
      teacherRemark: "Excellent neatness in labeling foci!"
    },
    {
      id: "hw_103",
      subject: "English",
      teacher: "Mr. Rohit Pandey",
      title: "Letter to Editor: Road Safety on Gorakhpur Highway",
      description: "Write a 150-word formal letter highlighting traffic congestion near Kushinagar turn.",
      assignedDate: "2026-11-21",
      dueDate: "2026-11-24",
      status: "Evaluated",
      submittedDate: "2026-11-23 04:00 PM",
      maxMarks: 10,
      obtainedMarks: 9,
      teacherRemark: "Very good vocabulary and formal tone."
    },
    {
      id: "hw_104",
      subject: "Hindi",
      teacher: "Pandit Ramakant Ji",
      title: "सूरदास के पद - व्याख्या एवं प्रश्नोत्तर",
      description: "पाठ 1 के सभी पदों का प्रसंग सहित व्याख्या अभ्यास पुस्तिका में लिखें।",
      assignedDate: "2026-11-24",
      dueDate: "2026-11-27",
      status: "Pending",
      hasAttachment: false,
      maxMarks: 10
    }
  ],

  // Student Exam Results (Term 1 & Mid Term)
  examResults: {
    term: "Half-Yearly Examination 2026-27",
    studentName: "Aarav Sharma",
    rollNo: 14,
    class: "10th - Section A",
    overallPercentage: "92.4%",
    overallGrade: "A1",
    rank: "3rd / 45 Students",
    attendance: "94.5%",
    subjects: [
      { code: "041", name: "Mathematics", theory: 76, maxTheory: 80, practical: 19, maxPractical: 20, total: 95, maxTotal: 100, grade: "A1", highestInClass: 98 },
      { code: "086", name: "Science", theory: 74, maxTheory: 80, practical: 20, maxPractical: 20, total: 94, maxTotal: 100, grade: "A1", highestInClass: 96 },
      { code: "184", name: "English Language & Lit", theory: 71, maxTheory: 80, practical: 19, maxPractical: 20, total: 90, maxTotal: 100, grade: "A1", highestInClass: 92 },
      { code: "002", name: "Hindi Course-A", theory: 73, maxTheory: 80, practical: 18, maxPractical: 20, total: 91, maxTotal: 100, grade: "A1", highestInClass: 94 },
      { code: "087", name: "Social Science", theory: 70, maxTheory: 80, practical: 19, maxPractical: 20, total: 89, maxTotal: 100, grade: "A2", highestInClass: 93 },
      { code: "165", name: "Computer Applications (AI)", theory: 48, maxTheory: 50, practical: 49, maxPractical: 50, total: 97, maxTotal: 100, grade: "A1", highestInClass: 99 }
    ],
    remarks: "Aarav is an exceptionally attentive and inquisitive student. Consistently tops in Science and Mathematics.",
    principalSignatureDate: "2026-10-28",
    status: "Verified & Published"
  },

  // Parents Fee Module
  feeDetails: {
    studentName: "Aarav Sharma",
    admissionNo: "RPS-2021-084",
    academicSession: "2026-2027",
    totalAnnualFee: 48000,
    totalPaid: 35500,
    currentDue: 12500,
    dueDate: "15 Dec 2026",
    status: "Partially Paid",
    breakdown: [
      { head: "Tuition Fee (Quarter 3)", amount: 8000, due: true },
      { head: "Computer & AI Lab Charges", amount: 1500, due: true },
      { head: "School Bus Transport (Gorakhpur Route 3)", amount: 2000, due: true },
      { head: "CBSE Pre-Board Exam Registration", amount: 1000, due: true }
    ],
    history: [
      { receiptNo: "RPS/REC/2026/0892", date: "2026-09-12", amount: 12000, term: "Quarter 2 Fee", mode: "UPI (GooglePay)", status: "Paid", downloadUrl: "#receipt-0892" },
      { receiptNo: "RPS/REC/2026/0411", date: "2026-06-10", amount: 11500, term: "Quarter 1 Fee", mode: "Net Banking (SBI)", status: "Paid", downloadUrl: "#receipt-0411" },
      { receiptNo: "RPS/REC/2026/0045", date: "2026-04-05", amount: 12000, term: "Annual Re-Admission & Dev Fee", mode: "Debit Card", status: "Paid", downloadUrl: "#receipt-0045" }
    ]
  },

  // Attendance Records for Calendar
  attendanceSummary: {
    totalWorkingDays: 142,
    presentDays: 134,
    absentDays: 5,
    leaveDays: 3,
    percentage: 94.4,
    currentMonth: {
      name: "November 2026",
      present: 20,
      absent: 1,
      holidays: 3,
      records: [
        { date: "2026-11-01", status: "Holiday (Sunday)" },
        { date: "2026-11-02", status: "Present" },
        { date: "2026-11-03", status: "Present" },
        { date: "2026-11-04", status: "Present" },
        { date: "2026-11-05", status: "Present" },
        { date: "2026-11-06", status: "Present" },
        { date: "2026-11-07", status: "Present" },
        { date: "2026-11-08", status: "Holiday (Sunday)" },
        { date: "2026-11-09", status: "Present" },
        { date: "2026-11-10", status: "Present" },
        { date: "2026-11-11", status: "Absent (Informed)" },
        { date: "2026-11-12", status: "Present" },
        { date: "2026-11-13", status: "Present" },
        { date: "2026-11-14", status: "Holiday (Children's Day Gala)" },
        { date: "2026-11-15", status: "Holiday (Sunday)" },
        { date: "2026-11-16", status: "Present" },
        { date: "2026-11-17", status: "Present" },
        { date: "2026-11-18", status: "Present" },
        { date: "2026-11-19", status: "Present" },
        { date: "2026-11-20", status: "Present" },
        { date: "2026-11-21", status: "Present" },
        { date: "2026-11-22", status: "Holiday (Sunday)" },
        { date: "2026-11-23", status: "Present" },
        { date: "2026-11-24", status: "Present (Today)" }
      ]
    }
  },

  // Class 10-A Student Roster for Teacher & Principal Mark Entry & Class Teacher Attendance
  class10Students: [
    { rollNo: 1, name: "Aaditya Pratap Singh", admissionNo: "RPS-2021-011", todayAttendance: "Present", mathScore: 92, scienceScore: 89, attendance: "96%", feeStatus: "Paid" },
    { rollNo: 2, name: "Aakanksha Yadav", admissionNo: "RPS-2021-014", todayAttendance: "Present", mathScore: 88, scienceScore: 91, attendance: "93%", feeStatus: "Paid" },
    { rollNo: 3, name: "Abhinav Kushwaha", admissionNo: "RPS-2021-022", todayAttendance: "Absent", mathScore: 78, scienceScore: 82, attendance: "91%", feeStatus: "Due ₹4,000" },
    { rollNo: 4, name: "Aditi Srivastava", admissionNo: "RPS-2021-029", todayAttendance: "Present", mathScore: 95, scienceScore: 94, attendance: "98%", feeStatus: "Paid" },
    { rollNo: 5, name: "Alok Kumar Gupta", admissionNo: "RPS-2021-035", todayAttendance: "Present", mathScore: 68, scienceScore: 72, attendance: "88%", feeStatus: "Paid" },
    { rollNo: 14, name: "Aarav Sharma", admissionNo: "RPS-2021-084", todayAttendance: "Present", mathScore: 95, scienceScore: 94, attendance: "94.5%", feeStatus: "Due ₹12,500" },
    { rollNo: 15, name: "Divya Pandey", admissionNo: "RPS-2021-092", todayAttendance: "Present", mathScore: 85, scienceScore: 87, attendance: "95%", feeStatus: "Paid" },
    { rollNo: 16, name: "Harshit Rai", admissionNo: "RPS-2021-098", todayAttendance: "Present", mathScore: 91, scienceScore: 90, attendance: "92%", feeStatus: "Paid" },
    { rollNo: 17, name: "Kajal Vishwakarma", admissionNo: "RPS-2021-104", todayAttendance: "Present", mathScore: 74, scienceScore: 78, attendance: "89%", feeStatus: "Due ₹8,000" },
    { rollNo: 18, name: "Mohd. Zeeshan Khan", admissionNo: "RPS-2021-110", todayAttendance: "Present", mathScore: 89, scienceScore: 86, attendance: "94%", feeStatus: "Paid" },
    { rollNo: 19, name: "Prashant Chaurasia", admissionNo: "RPS-2021-118", todayAttendance: "Present", mathScore: 83, scienceScore: 85, attendance: "90%", feeStatus: "Paid" },
    { rollNo: 20, name: "Riya Mall", admissionNo: "RPS-2021-125", todayAttendance: "Present", mathScore: 96, scienceScore: 97, attendance: "99%", feeStatus: "Paid" }
  ],

  // Examination Module Data (Principal & Teacher Duties)
  examSchedule: {
    title: "CBSE Pre-Board & Annual Assessment 2026-27",
    dates: [
      { date: "05 Dec 2026", day: "Saturday", shift: "Morning (09:30 AM - 12:30 PM)", subject: "English Language & Literature", classes: "Class 10th & 12th", rooms: "Hall 1, Hall 2, Room 101-105" },
      { date: "08 Dec 2026", day: "Tuesday", shift: "Morning (09:30 AM - 12:30 PM)", subject: "Mathematics / Applied Maths", classes: "Class 10th & 12th", rooms: "Hall 1, Hall 2, Room 101-105" },
      { date: "11 Dec 2026", day: "Friday", shift: "Morning (09:30 AM - 12:30 PM)", subject: "Science / Physics", classes: "Class 10th & 12th", rooms: "Hall 1, Hall 2, Science Labs" },
      { date: "14 Dec 2026", day: "Monday", shift: "Morning (09:30 AM - 12:30 PM)", subject: "Social Science / Chemistry", classes: "Class 10th & 12th", rooms: "Hall 1, Hall 2" },
      { date: "17 Dec 2026", day: "Thursday", shift: "Morning (09:30 AM - 12:30 PM)", subject: "Hindi / Biology / Accountancy", classes: "Class 10th & 12th", rooms: "Hall 1, Hall 2" },
      { date: "20 Dec 2026", day: "Sunday", shift: "Morning (09:30 AM - 11:30 AM)", subject: "Computer Applications / AI", classes: "Class 10th & 12th", rooms: "Smart Lab A & B" }
    ],
    invigilationDuties: [
      { teacher: "Mrs. Sunita Verma", dutyRole: "Room Invigilator", room: "Room 102", dates: "05, 11, 17 Dec 2026", status: "Assigned" },
      { teacher: "Mr. Rohit Pandey", dutyRole: "Chief Flying Squad", room: "All Wings", dates: "05 to 20 Dec 2026", status: "Confirmed" },
      { teacher: "Ms. Priyanka Tiwari", dutyRole: "Room Invigilator", room: "Hall 1 (Section A)", dates: "08, 14 Dec 2026", status: "Assigned" },
      { teacher: "Er. Deepak Gupta", dutyRole: "Tech & Answer Sheet Superintendent", room: "Exam Control Room", dates: "Full Schedule", status: "Confirmed" },
      { teacher: "Pandit Ramakant Ji", dutyRole: "Room Invigilator", room: "Room 104", dates: "08, 11, 17 Dec 2026", status: "Assigned" }
    ]
  },

  // School Events (Gorakhpur & Kushinagar context)
  events: [
    {
      id: "ev_01",
      title: "Annual Sports Meet & Athletic Championship 2026",
      hindiTitle: "वार्षिक खेलकूद एवं एथलेटिक प्रतियोगिता",
      date: "18 - 19 December 2026",
      venue: "Kushinagar District Sports Complex / RPS Main Arena",
      coordinator: "Coach Mahendra Yadav (Sports Director)",
      description: "Inter-house 100m sprint, relay, long jump, volleyball, cricket & kho-kho tournament with Chief Guest District Magistrate Gorakhpur.",
      category: "Sports",
      badge: "Upcoming Mega Event",
      status: "Registrations Open",
      budget: "₹1,80,000",
      targetClasses: "Classes 3rd to 12th"
    },
    {
      id: "ev_02",
      title: "Gorakhpur - Kushinagar Regional Science & Robotics Expo",
      hindiTitle: "क्षेत्रीय विज्ञान एवं रोबोटिक्स प्रदर्शनी 2027",
      date: "10 January 2027",
      venue: "RPS Atal Tinkering & AI Lab",
      coordinator: "Dr. Surendra K. Mishra (Principal)",
      description: "Over 60 working models, drone simulations, solar energy projects by students from Eastern UP schools.",
      category: "Academic / STEM",
      badge: "Flagship Expo",
      status: "Model Submissions",
      budget: "₹95,000",
      targetClasses: "Classes 6th to 12th"
    },
    {
      id: "ev_03",
      title: "Vasant Panchami Saraswati Mahotsav & Cultural Fest",
      hindiTitle: "माँ सरस्वती पूजन एवं भव्य सांस्कृतिक उत्सव",
      date: "23 January 2027",
      venue: "School Central Open Air Auditorium",
      coordinator: "Mrs. Sunita Verma & Pandit Ramakant Ji",
      description: "Traditional Saraswati Vandana, classical folk dance of Purvanchal, patriotic drama, and prize distribution.",
      category: "Cultural",
      badge: "Community Celebration",
      status: "Practice in Progress",
      budget: "₹1,20,000",
      targetClasses: "All Students & Parents"
    },
    {
      id: "ev_04",
      title: "Republic Day Parade & Toppers Felicitation Ceremony",
      hindiTitle: "78वाँ गणतंत्र दिवस समारोह एवं मेधावी छात्र सम्मान",
      date: "26 January 2027",
      venue: "School Parade Ground",
      coordinator: "Admin Anand Mishra",
      description: "Flag hoisting by Chairman, NCC & Scout parade, medal distribution for CBSE toppers.",
      category: "National",
      badge: "State Level",
      status: "Scheduled",
      budget: "₹65,000",
      targetClasses: "Entire School & Faculty"
    }
  ],

  // Admissions & Enquiry Management
  admissions: [
    { id: "ENQ-2027-0101", studentName: "Shubham Pathak", parentName: "Vinod Pathak", phone: "+91 94500 11223", applyingClass: "Class 11th (PCM)", location: "Gorakhpur City", date: "2026-11-23", status: "Document Verification", entranceTestScore: "86/100" },
    { id: "ENQ-2027-0102", studentName: "Ananya Mishra", parentName: "Dinesh Mishra", phone: "+91 98380 44556", applyingClass: "Class 9th", location: "Hata, Kushinagar", date: "2026-11-22", status: "Interview Scheduled", entranceTestScore: "90/100" },
    { id: "ENQ-2027-0103", studentName: "Rohan Kushwaha", parentName: "Santosh Kushwaha", phone: "+91 91400 77889", applyingClass: "Class 6th", location: "Kushinagar", date: "2026-11-21", status: "Admitted", feePaid: "₹18,000" },
    { id: "ENQ-2027-0104", studentName: "Kavya Singh", parentName: "Akhilesh Singh", phone: "+91 97920 33445", applyingClass: "Pre-Nursery", location: "Gorakhpur Cantt", date: "2026-11-20", status: "New Enquiry", entranceTestScore: "Pending" }
  ],

  // Teacher Payroll & Attendance (Admin View)
  payroll: [
    { empId: "RPS-FAC-01", name: "Dr. Surendra K. Mishra", designation: "Principal", department: "Physics", basic: 65000, da: 12000, hra: 8000, allowances: 5000, deductions: 3500, netPay: 86500, status: "Paid", attendanceDays: "24/24" },
    { empId: "RPS-FAC-04", name: "Mrs. Sunita Verma", designation: "TGT Mathematics", department: "Mathematics", basic: 32000, da: 5000, hra: 4000, allowances: 3000, deductions: 1500, netPay: 42500, status: "Processed", attendanceDays: "23/24" },
    { empId: "RPS-FAC-08", name: "Mr. Rohit Pandey", designation: "PGT English", department: "Languages", basic: 34000, da: 5500, hra: 4000, allowances: 2500, deductions: 1600, netPay: 44400, status: "Processed", attendanceDays: "24/24" },
    { empId: "RPS-FAC-12", name: "Ms. Priyanka Tiwari", designation: "TGT Social Studies", department: "Humanities", basic: 29000, da: 4500, hra: 3500, allowances: 2000, deductions: 1400, netPay: 37600, status: "Processed", attendanceDays: "22/24" },
    { empId: "RPS-FAC-15", name: "Er. Deepak Gupta", designation: "HOD Computer Science & AI", department: "IT & AI", basic: 36000, da: 6000, hra: 4500, allowances: 3000, deductions: 1800, netPay: 47700, status: "Processed", attendanceDays: "24/24" },
    { empId: "RPS-FAC-20", name: "Coach Mahendra Yadav", designation: "Physical Education Director", department: "Sports", basic: 28000, da: 4000, hra: 3000, allowances: 2000, deductions: 1200, netPay: 35800, status: "Processed", attendanceDays: "24/24" }
  ],

  // Notice & Broadcast Center (SMS, WhatsApp, App Push)
  notices: [
    {
      id: "not_201",
      title: "Winter School Timings Update (w.e.f. 01 December)",
      hindiTitle: "शीतकालीन विद्यालय समय परिवर्तन सूचना (1 दिसम्बर से प्रभावी)",
      category: "Urgent Administrative",
      date: "24 Nov 2026",
      audience: "All Parents & Students (Classes Nursery to 12th)",
      channels: ["Mobile App Push", "WhatsApp Broadcast", "SMS"],
      content: "Dear Parents, In view of incoming winter fog in Gorakhpur-Kushinagar region, school will operate from 08:30 AM to 02:00 PM starting 1st December. School buses will ply 30 minutes later than regular schedule.",
      hindiContent: "अभिभावक महोदय, गोरखपुर-कुशीनगर क्षेत्र में ठंड एवं कोहरे के मद्देनजर 1 दिसम्बर से विद्यालय का समय प्रातः 08:30 बजे से दोपहर 02:00 बजे तक रहेगा। स्कूल बसें 30 मिनट विलंब से संचालित होंगी।",
      sentBy: "Principal Office",
      deliveredCount: "1,390 Delivered",
      whatsappStatus: "Read 92%"
    },
    {
      id: "not_202",
      title: "Parent-Teacher Meeting (PTM) & Term 1 Report Cards",
      hindiTitle: "अभिभावक-शिक्षक बैठक (PTM) एवं प्रगति पत्र वितरण",
      category: "Academic",
      date: "20 Nov 2026",
      audience: "Classes 9th, 10th, 11th, 12th",
      channels: ["Mobile App Push", "WhatsApp"],
      content: "Dear Parents, PTM for Half-Yearly analysis is scheduled for Saturday, 28th Nov from 9 AM to 1 PM. Your presence is essential to discuss your child's board preparation.",
      hindiContent: "अर्धवार्षिक परीक्षा समीक्षा हेतु PTM शनिवार 28 नवम्बर को प्रातः 9 से 1 बजे तक आयोजित होगी। सभी अभिभावकों की उपस्थिति अनिवार्य है।",
      sentBy: "Mrs. Sunita Verma (Class 10-A)",
      deliveredCount: "142 Delivered",
      whatsappStatus: "Read 98%"
    },
    {
      id: "not_203",
      title: "Quarter 3 Fee Payment Reminder",
      hindiTitle: "तृतीय त्रैमासिक शुल्क जमा करने हेतु आवश्यक सूचना",
      category: "Fee Accounts",
      date: "18 Nov 2026",
      audience: "Fee Defaulters & General",
      channels: ["WhatsApp", "SMS"],
      content: "Kindly clear the pending tuition and bus fee installments for Q3 before 15th December 2026 to avoid late fine. Pay online via App UPI or school counter.",
      hindiContent: "कृपया 15 दिसम्बर 2026 से पूर्व तृतीय किस्त का शुल्क ऑनलाइन यूपीआई या स्कूल काउंटर पर जमा कराएं।",
      sentBy: "Admin Anand Mishra",
      deliveredCount: "420 Delivered",
      whatsappStatus: "Read 89%"
    }
  ],

  // Public Page Transparent Fee Structure
  publicFeeStructure: [
    { classGroup: "Pre-Primary (Nursery, LKG, UKG)", admissionFee: "₹5,000 (One-time)", quarterlyTuition: "₹4,500", annualCharges: "₹3,500", facilities: "Activity Playroom, AC Classrooms, Day Care" },
    { classGroup: "Primary (Classes 1st to 5th)", admissionFee: "₹6,000 (One-time)", quarterlyTuition: "₹6,000", annualCharges: "₹4,000", facilities: "Smart Boards, Computer Lab, Abacus, Karate" },
    { classGroup: "Middle (Classes 6th to 8th)", admissionFee: "₹7,000 (One-time)", quarterlyTuition: "₹7,500", annualCharges: "₹4,500", facilities: "Robotics, Science Labs, Language Lab, Sports Coaching" },
    { classGroup: "Secondary (Classes 9th & 10th)", admissionFee: "₹8,000 (One-time)", quarterlyTuition: "₹9,000", annualCharges: "₹5,000", facilities: "CBSE Board Prep, AI & Coding, Career Counseling" },
    { classGroup: "Sr. Secondary (Classes 11th & 12th Science/Comm)", admissionFee: "₹10,000 (One-time)", quarterlyTuition: "₹12,000", annualCharges: "₹6,000", facilities: "JEE/NEET Integrated Mentorship, Advanced Lab, Library" }
  ],

  // Banners templates for Public Page and local hoardings in Gorakhpur/Kushinagar
  bannerTemplates: [
    {
      id: "ban_01",
      titleHindi: "प्रवेश प्रारंभ सत्र 2026-2027",
      titleEnglish: "Admissions Open for Session 2026-27",
      subtitleHindi: "प्ले ग्रुप से कक्षा 12वीं तक (सीबीएसई बोर्ड)",
      subtitleEnglish: "Pre-Nursery to Class 12th • Science, Commerce & Humanities",
      tag: "गोरखपुर एवं कुशीनगर का सर्वश्रेष्ठ डिजिटल स्मार्ट विद्यालय",
      pointsHindi: [
        "✓ 100% अनुशासित एवं वातानुकूलित (AC) स्मार्ट क्लासरूम",
        "✓ गोरखपुर, हाटा, कुशीनगर, कसया के सभी मार्गों पर सुगम बस सुविधा",
        "✓ रोबोटिक्स, आर्टिफिशियल इंटेलिजेंस (AI) एवं अत्याधुनिक प्रयोगशालाएं",
        "✓ नीट/जेईई (NEET/JEE) की विशेष तैयारी विद्यालय में ही उपलब्ध",
        "✓ विशाल क्रीड़ांगन - क्रिकेट, वॉलीबॉल, एथलेटिक्स एवं मार्शल आर्ट्स"
      ],
      contactText: "संपर्क करें: 94520-88910, 91250-44321 | राष्ट्रीय राजमार्ग 28, कुशीनगर",
      themeColor: "from-blue-700 via-indigo-800 to-amber-700"
    },
    {
      id: "ban_02",
      titleHindi: "मेधावी छात्र छात्रवृत्ति परीक्षा 2027",
      titleEnglish: "RPS Talent Search & Scholarship Test",
      subtitleHindi: "प्रतिभाशाली छात्रों को 100% तक की फीस में छूट",
      subtitleEnglish: "Up to 100% Tuition Fee Waiver for Meritorious Students",
      tag: "कक्षा 5वीं से 11वीं के विद्यार्थियों के लिए सुनहरा अवसर",
      pointsHindi: [
        "✓ परीक्षा तिथि: रविवार 17 जनवरी 2027",
        "✓ परीक्षा केंद्र: राघव पब्लिक स्कूल परिसर, एन.एच. 28",
        "✓ रजिस्ट्रेशन पूर्णतः निःशुल्क - आज ही ऑनलाइन फॉर्म भरें"
      ],
      contactText: "ऑनलाइन आवेदन हेतु वेबसाइट: www.rahavpublicschool.edu.in",
      themeColor: "from-emerald-800 via-teal-900 to-cyan-900"
    },
    {
      id: "ban_03",
      titleHindi: "सीबीएसई बोर्ड परीक्षा 2026 में ऐतिहासिक परिणाम!",
      titleEnglish: "Outstanding CBSE Board Results 2026",
      subtitleHindi: "हमारे होनहारों ने बढ़ाया पूर्वांचल का मान",
      subtitleEnglish: "Purvanchal Toppers from Rahav Public School",
      tag: "100% उत्तीर्ण परिणाम • 38 छात्रों के 90% से अधिक अंक",
      pointsHindi: [
        "★ प्रियांशु सिंह (12वीं विज्ञान) - 98.4% (जिला प्रथम)",
        "★ सौम्या श्रीवास्तव (10वीं) - 97.8% (कुशीनगर टॉप 3)",
        "★ सभी सफल विद्यार्थियों एवं सम्मानित शिक्षकों को हार्दिक बधाई"
      ],
      contactText: "राघव पब्लिक स्कूल, गोरखपुर-कुशीनगर मार्ग",
      themeColor: "from-amber-600 via-orange-700 to-red-800"
    }
  ],

  // Student Leave Applications (Applied by Parents, Approved by Class Teacher / Principal)
  leaveApplications: [
    {
      id: "LEV-2026-089",
      studentName: "Aarav Sharma",
      class: "10th - Section A",
      rollNo: 14,
      parentName: "Mr. Rajesh Sharma",
      parentPhone: "+91 94152 77889",
      fromDate: "2026-11-28",
      toDate: "2026-11-30",
      daysCount: 3,
      reasonCategory: "Family Wedding / Function",
      reasonDetail: "Attending elder cousin's wedding ceremony in Gorakhpur city. Aarav will complete pending NCERT exercises in advance.",
      appliedDate: "2026-11-24 10:15 AM",
      status: "Pending Approval", // Pending Approval, Approved, Rejected
      reviewedBy: "Under review by Mrs. Sunita Verma (Class Teacher)",
      teacherRemarks: ""
    },
    {
      id: "LEV-2026-074",
      studentName: "Aarav Sharma",
      class: "10th - Section A",
      rollNo: 14,
      parentName: "Mr. Rajesh Sharma",
      parentPhone: "+91 94152 77889",
      fromDate: "2026-11-11",
      toDate: "2026-11-11",
      daysCount: 1,
      reasonCategory: "Medical / Viral Fever",
      reasonDetail: "Suffering from high seasonal fever. Advised 1 day bed rest by family physician.",
      appliedDate: "2026-11-10 07:45 PM",
      status: "Approved",
      reviewedBy: "Mrs. Sunita Verma (Class Teacher)",
      teacherRemarks: "Approved. Take proper rest and collect class notes from Divya."
    }
  ],

  // Grievance & Complaints Module (Logged by Parents, visible to Class Teacher, Principal & Super Admin)
  complaints: [
    {
      id: "CMP-2026-042",
      ticketNo: "#TKT-4209",
      studentName: "Aarav Sharma",
      class: "10th - Section A",
      parentName: "Mr. Rajesh Sharma",
      parentPhone: "+91 94152 77889",
      category: "Transport / School Bus",
      subject: "Morning delay of School Bus Route 3 near Hata/Sukrauli turn",
      severity: "Medium",
      date: "2026-11-23 08:45 AM",
      status: "In Progress", // Open, In Progress, Resolved
      details: "School Bus No. 3 arrived 25 minutes late at the Hata pickup point for two consecutive days due to heavy winter fog. Kindly advise the driver to adjust morning schedule.",
      visibility: ["Class Teacher", "Principal", "Super Admin"],
      responses: [
        { author: "Mrs. Sunita Verma (Class Teacher)", role: "Class Teacher", text: "Acknowledged. I have notified Coach Mahendra (Transport In-charge) to coordinate with the driver.", time: "23 Nov, 11:30 AM" },
        { author: "Dr. S. K. Mishra (Principal)", role: "Principal", text: "Winter bus timings revised w.e.f. 1st Dec (+30 mins buffer). Driver has been instructed to follow the fog protocol.", time: "24 Nov, 09:15 AM" }
      ]
    },
    {
      id: "CMP-2026-038",
      ticketNo: "#TKT-3814",
      studentName: "Abhinav Kushwaha",
      class: "10th - Section A",
      parentName: "Mr. Santosh Kushwaha",
      parentPhone: "+91 91400 77889",
      category: "Academics",
      subject: "Request for extra doubt clearance session in Physics Numerical Problems",
      severity: "Low",
      date: "2026-11-19 04:20 PM",
      status: "Resolved",
      details: "Abhinav is facing difficulty in solving numerical problems of Light & Optics chapter. Requested special remedial assistance.",
      visibility: ["Class Teacher", "Principal", "Super Admin"],
      responses: [
        { author: "Dr. S. K. Mishra (Principal & Physics Mentor)", role: "Principal", text: "Arranged special 40-minute remedial doubt session every Saturday 1:30 PM in Physics Lab 1.", time: "20 Nov, 02:00 PM" }
      ]
    }
  ],

  // Staff Directory for Role Allocation (Super Admin assigns Staff Roles; Principal assigns Class/Subject Teacher)
  staffDirectory: [
    {
      empId: "RPS-FAC-01",
      name: "Dr. Surendra K. Mishra",
      phone: "+91 94520 88902",
      email: "principal@rahavpublicschool.edu.in",
      staffRole: "Principal", // Assigned by Super Admin (Principal, Admin, Teacher)
      assignedBySuperAdmin: "Er. Raghavendra Singh (Chairman)",
      classTeacherOf: "None (Institutional Head)", // Assigned by Principal
      subjectAssignments: ["Class 12th Physics (Advanced)", "Class 10th Physics Lab"]
    },
    {
      empId: "RPS-FAC-02",
      name: "Anand Mishra",
      phone: "+91 94520 88901",
      email: "admin@rahavpublicschool.edu.in",
      staffRole: "Admin", // Assigned by Super Admin
      assignedBySuperAdmin: "Er. Raghavendra Singh (Chairman)",
      classTeacherOf: "N/A (Administrative Staff)",
      subjectAssignments: ["Admissions, Fee Counter & Student Onboarding"]
    },
    {
      empId: "RPS-FAC-04",
      name: "Mrs. Sunita Verma",
      phone: "+91 98391 12345",
      email: "sunita.verma@rahavpublicschool.edu.in",
      staffRole: "Teacher", // Assigned by Super Admin
      assignedBySuperAdmin: "Er. Raghavendra Singh (Chairman)",
      classTeacherOf: "Class 10-A", // Assigned by Principal
      subjectAssignments: ["Mathematics (10-A)", "Mathematics (10-B)", "Vedic Maths Club"]
    },
    {
      empId: "RPS-FAC-08",
      name: "Mr. Rohit Pandey",
      phone: "+91 98380 99887",
      email: "rohit.pandey@rahavpublicschool.edu.in",
      staffRole: "Teacher",
      assignedBySuperAdmin: "Er. Raghavendra Singh (Chairman)",
      classTeacherOf: "Class 12th Science", // Assigned by Principal
      subjectAssignments: ["English Language & Lit (10-A, 12th)"]
    },
    {
      empId: "RPS-FAC-12",
      name: "Ms. Priyanka Tiwari",
      phone: "+91 97920 66554",
      email: "priyanka.tiwari@rahavpublicschool.edu.in",
      staffRole: "Teacher",
      assignedBySuperAdmin: "Er. Raghavendra Singh (Chairman)",
      classTeacherOf: "Class 9th-B",
      subjectAssignments: ["Social Science (9th, 10th)"]
    },
    {
      empId: "RPS-FAC-15",
      name: "Er. Deepak Gupta",
      phone: "+91 91250 33221",
      email: "deepak.gupta@rahavpublicschool.edu.in",
      staffRole: "Teacher",
      assignedBySuperAdmin: "Er. Raghavendra Singh (Chairman)",
      classTeacherOf: "Class 11th Science",
      subjectAssignments: ["Computer Applications & AI (10th, 11th, 12th)"]
    }
  ],

  // Student & Parent Accounts Onboarded by Admin
  onboardedAccounts: [
    {
      admissionNo: "RPS-2021-084",
      studentName: "Aarav Sharma",
      class: "10th - Section A",
      parentName: "Mr. Rajesh Sharma",
      parentPhone: "+91 94152 77889",
      parentEmail: "rajesh.sharma.gkp@gmail.com",
      feeStatus: "Partially Paid (Due ₹12,500)",
      onboardedBy: "Anand Mishra (Admin)",
      onboardedDate: "2021-04-12"
    },
    {
      admissionNo: "RPS-2022-102",
      studentName: "Aditi Srivastava",
      class: "10th - Section A",
      parentName: "Dr. K. K. Srivastava",
      parentPhone: "+91 94500 55667",
      parentEmail: "kk.srivastava@gmail.com",
      feeStatus: "Fully Paid",
      onboardedBy: "Anand Mishra (Admin)",
      onboardedDate: "2022-04-05"
    },
    {
      admissionNo: "RPS-2023-145",
      studentName: "Priyanshu Maurya",
      class: "11th Science",
      parentName: "Mr. Ramesh Maurya",
      parentPhone: "+91 94520 11990",
      parentEmail: "ramesh.maurya@rediffmail.com",
      feeStatus: "Initial Deposit ₹18,000",
      onboardedBy: "Anand Mishra (Admin)",
      onboardedDate: "2026-11-24"
    }
  ],

  // Live CCTV Surveillance System Data
  cctvFeeds: [
    {
      id: "cam_10a_front",
      name: "Class 10-A (Smart Board & Teacher Angle)",
      classRoom: "10-A",
      location: "Room 204, Academic Block A",
      resolution: "1080p FHD (25 fps)",
      status: "LIVE",
      bitrate: "4.2 Mbps",
      parentAccessible: true, // Aarav's parents can view
      activeTeacher: "Mrs. Sunita Verma (Mathematics)",
      currentActivity: "Algebra & Quadratic Formula Discussion",
      type: "classroom"
    },
    {
      id: "cam_10a_rear",
      name: "Class 10-A (Student Desks & Aarav Row View)",
      classRoom: "10-A",
      location: "Room 204, Academic Block A",
      resolution: "1080p FHD (25 fps)",
      status: "LIVE",
      bitrate: "3.8 Mbps",
      parentAccessible: true, // Aarav sits at Row 2, Desk 3
      activeTeacher: "Mrs. Sunita Verma",
      currentActivity: "Students Taking Notes & Practicing Ex 4.3",
      type: "classroom"
    },
    {
      id: "cam_12a_phys",
      name: "Class 12-A & Advanced Physics Lab",
      classRoom: "12-A",
      location: "Room 301, Senior Science Wing",
      resolution: "1080p FHD (30 fps)",
      status: "LIVE",
      bitrate: "4.5 Mbps",
      parentAccessible: false,
      activeTeacher: "Dr. S. K. Mishra (Principal)",
      currentActivity: "Ray Optics Practical Demonstration",
      type: "laboratory"
    },
    {
      id: "cam_assembly",
      name: "Central Assembly & Sports Quadrangle",
      classRoom: "General",
      location: "Central Campus Plaza",
      resolution: "4K UHD (30 fps)",
      status: "LIVE",
      bitrate: "6.8 Mbps",
      parentAccessible: true,
      activeTeacher: "P.T.I. Coach Shailendra",
      currentActivity: "Inter-House Badminton Practice",
      type: "outdoor"
    },
    {
      id: "cam_main_gate",
      name: "Main NH-28 Highway Security Gate",
      classRoom: "Campus Perimeter",
      location: "Security Post 1 (Gorakhpur-Kushinagar Hwy)",
      resolution: "4K UHD (30 fps, Night Vision IR)",
      status: "LIVE",
      bitrate: "5.5 Mbps",
      parentAccessible: false,
      activeTeacher: "Security Officer R. B. Singh",
      currentActivity: "Visitor Log & RFID School Bus Entry Monitoring",
      type: "perimeter"
    },
    {
      id: "cam_bus_bay",
      name: "School Bus Terminal & Boarding Bay",
      classRoom: "Transport Bay",
      location: "South Parking Zone",
      resolution: "1080p FHD (25 fps)",
      status: "LIVE",
      bitrate: "4.0 Mbps",
      parentAccessible: false,
      activeTeacher: "Transport In-Charge Virendra",
      currentActivity: "Bus Fleet Safety Inspections & Sanitization",
      type: "transport"
    }
  ],

  // Real-time GPS School Bus Fleet Tracking Data
  busFleet: {
    aaravBus: {
      busId: "BUS-04",
      regNo: "UP-57-AT-4412",
      model: "Tata Starbus Ultra (42-Seater, BS-VI)",
      routeName: "Route 04: Gorakhpur - Kasia - Kushinagar Express",
      driverName: "Mr. Ramvriksh Yadav",
      driverPhone: "+91 98391 44120",
      attendantName: "Mrs. Sita Devi (Certified Female Attendant)",
      attendantPhone: "+91 97921 55661",
      currentSpeed: 38,
      speedLimit: 40,
      status: "In Transit • On Time",
      geofenceStatus: "Inside Authorized Corridor",
      gpsSignal: "Strong (4G LTE NavIC)",
      etaToChildStop: "14 mins",
      distanceToChildStop: "4.8 km",
      childPickupDrop: {
        childName: "Aarav Sharma",
        admissionNo: "RPS-2021-084",
        seatNumber: 14,
        stopName: "Kushinagar Toll Plaza / Royal Residency Chauraha",
        scheduledMorning: "07:45 AM",
        scheduledEvening: "03:15 PM",
        status: "Boarded & Verified via RFID Scan (07:42 AM)"
      },
      currentStopIndex: 3,
      stops: [
        { name: "Gorakhpur AIIMS Terminal", time: "07:15 AM", status: "completed" },
        { name: "Khorabar Bypass NH-28", time: "07:32 AM", status: "completed" },
        { name: "Hata Chauraha Overbridge", time: "07:54 AM", status: "completed" },
        { name: "Sukrauli Bazar", time: "08:08 AM", status: "current" },
        { name: "Kasia Tiraha / Buddha P.G.", time: "08:18 AM", status: "upcoming" },
        { name: "Kushinagar Toll Plaza (Aarav Stop)", time: "08:26 AM", status: "upcoming" },
        { name: "Rahav Public School Campus Gate", time: "08:35 AM", status: "upcoming" }
      ]
    },
    allBuses: [
      {
        id: "BUS-01",
        regNo: "UP-57-AT-1001",
        route: "Route 01: Gorakhpur City (Golghar - Mohaddipur)",
        driver: "Shiv Prasad",
        phone: "+91 94501 11223",
        speed: 36,
        status: "Active (On Route)",
        students: 38,
        gps: "Online"
      },
      {
        id: "BUS-02",
        regNo: "UP-57-AT-2204",
        route: "Route 02: Deoria Road (Tarkulwa - Rampur)",
        driver: "Maheshwar Nath",
        phone: "+91 94502 22334",
        speed: 34,
        status: "Active (On Route)",
        students: 40,
        gps: "Online"
      },
      {
        id: "BUS-03",
        regNo: "UP-57-AT-3315",
        route: "Route 03: Hata - Sukrauli Rural Belt",
        driver: "Dinesh Chaubey",
        phone: "+91 94503 33445",
        speed: 39,
        status: "Active (On Route)",
        students: 35,
        gps: "Online"
      },
      {
        id: "BUS-04",
        regNo: "UP-57-AT-4412",
        route: "Route 04: Gorakhpur - Kasia - Kushinagar Express (Aarav's Bus)",
        driver: "Ramvriksh Yadav",
        phone: "+91 98391 44120",
        speed: 38,
        status: "Active (On Route)",
        students: 32,
        gps: "Online"
      },
      {
        id: "BUS-05",
        regNo: "UP-57-AT-5526",
        route: "Route 05: Padrauna City Highway Corridor",
        driver: "Santosh Gond",
        phone: "+91 94505 55667",
        speed: 41,
        status: "Alert: Speed 41 km/h (>40 limit)",
        students: 36,
        gps: "Online"
      },
      {
        id: "BUS-06",
        regNo: "UP-57-AT-6638",
        route: "Route 06: Pipraich - Motiram Adda Loop",
        driver: "Kishan Lal",
        phone: "+91 94506 66778",
        speed: 32,
        status: "Active (On Route)",
        students: 29,
        gps: "Online"
      },
      {
        id: "BUS-07",
        regNo: "UP-57-AT-7749",
        route: "Route 07: Fazilnagar - Tamkuhi Road",
        driver: "Vikram Chauhan",
        phone: "+91 94507 77889",
        speed: 37,
        status: "Active (On Route)",
        students: 34,
        gps: "Online"
      },
      {
        id: "BUS-08",
        regNo: "UP-57-AT-8850",
        route: "Route 08: Standby Emergency & Sports Fleet",
        driver: "Munna Rai",
        phone: "+91 94508 88990",
        speed: 0,
        status: "Parked at Campus Depot",
        students: 0,
        gps: "Online (Stationary)"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // TEACHER PORTFOLIO & FACULTY SHOWCASE DATA (PUBLIC WEBSITE)
  // --------------------------------------------------------------------------
  facultyPortfolios: [
    {
      id: 'dr_sk_mishra',
      name: 'Dr. Surendra K. Mishra',
      hindiName: 'डॉ. सुरेंद्र के. मिश्रा',
      role: 'Principal & Senior Physics Mentor',
      department: 'Science & Senior Secondary',
      category: 'science',
      qualifications: 'M.Sc. Physics (Gold Medalist), Ph.D., B.Ed.',
      experience: '22+ Years in Senior CBSE Institutions (Ex-Kendriya Vidyalaya)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      specialization: 'Quantum Mechanics, Ray Optics & Competitive IIT-JEE/NEET Foundation',
      awards: 'CBSE State Best Teacher Award 2021 • National Science Congress Delegate',
      boardRecord: '100% CBSE Class 12th Board Results for 12 Consecutive Years (14 IITians)',
      bio: 'Dr. Mishra has mentored thousands of students across Eastern UP. He blends rigorous academic foundations with interactive digital physics laboratory experiments.',
      quote: 'Physics is not about memorizing formulas; it is about observing how the cosmos functions.',
      subjects: ['Class 12th Advanced Physics', 'IIT-JEE/NEET Physics Masterclass']
    },
    {
      id: 'mrs_sunita_verma',
      name: 'Mrs. Sunita Verma',
      hindiName: 'श्रीमती सुनीता वर्मा',
      role: 'Class 10-A In-Charge & TGT Mathematics',
      department: 'Mathematics Department',
      category: 'math',
      qualifications: 'M.Sc. Applied Mathematics, B.Ed.',
      experience: '14+ Years in Senior CBSE Secondary Education',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      specialization: 'Algebra, Coordinate Geometry, Trigonometry & Vedic Mathematics',
      awards: 'District Best Class Teacher Award 2023 • Ramanujan Olympiad Coordinator',
      boardRecord: '38 Students Scored 90%+ in CBSE Class 10th Board Mathematics',
      bio: 'As Class 10-A In-Charge, Mrs. Verma coordinates morning roll calls, prepares comprehensive marksheets, and leads the Vedic Maths Club with daily practice drills.',
      quote: 'Every child possesses an analytical mind; they only need the right geometric perspective.',
      subjects: ['Class 10-A Mathematics', 'Class 10-B Mathematics', 'Vedic Maths Club']
    },
    {
      id: 'mr_rohit_pandey',
      name: 'Mr. Rohit Pandey',
      hindiName: 'श्री रोहित पाण्डेय',
      role: 'PGT English Literature & Chief Debating Mentor',
      department: 'Humanities & Languages',
      category: 'languages',
      qualifications: 'M.A. English (BHU), B.Ed., UGC-NET Qualified',
      experience: '11+ Years Experience in Senior English',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
      specialization: 'British & World Literature, Creative Writing, Phonetics & Model UN (MUN)',
      awards: 'North India Inter-School Oratory Coach Award 2024',
      boardRecord: 'School Average of 88.6% in CBSE 12th English Core',
      bio: 'Directs the school theater society and competitive public speaking cell. Prepares students for national debates and civil services language foundation.',
      quote: 'Language is the dress of thought. Eloquence unlocks boundless opportunities.',
      subjects: ['Class 10-A English Core', 'Class 12th English Literature', 'MUN Debating']
    },
    {
      id: 'er_deepak_gupta',
      name: 'Er. Deepak Gupta',
      hindiName: 'इंजी. दीपक गुप्ता',
      role: 'Head of AI, Computer Science & Atal Robotics Lab',
      department: 'Computer Science & STEM',
      category: 'science',
      qualifications: 'B.Tech Computer Science & Engg. (Ex-Systems Engineer, Infosys)',
      experience: '8+ Years in EdTech & Modern Coding Curriculum',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      specialization: 'Python Programming, Machine Learning Basics, Arduino IoT & Robotics',
      awards: 'Atal Innovation Mission (AIM) Top Mentor Certificate 2024',
      boardRecord: '100% Distinction in CBSE 12th Computer Science (Code 083)',
      bio: 'Directs the 1,500 sq.ft Atal Tinkering Lab at RPS. Guided students to Top 5 in the UP State Innovation Hackathon with their solar smart irrigation device.',
      quote: 'Coding is the new universal literacy. Every student at RPS writes code from Grade 6.',
      subjects: ['Class 10th AI Foundation', 'Class 12th Python & SQL', 'Robotics Club']
    },
    {
      id: 'ms_priyanka_tiwari',
      name: 'Ms. Priyanka Tiwari',
      hindiName: 'सुश्री प्रियंका तिवारी',
      role: 'TGT Social Science & Heritage Club In-Charge',
      department: 'Humanities & Social Sciences',
      category: 'humanities',
      qualifications: 'M.A. Modern Indian History, B.Ed., CTET',
      experience: '9+ Years in CBSE Social Studies',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      specialization: 'Contemporary World History, Civics & Archaeological Heritage',
      awards: 'Curator of the Gorakhpur-Kushinagar Historical Heritage Exhibition 2025',
      boardRecord: '98% Pass Rate with 32 Distinctions in Class 10th Social Science',
      bio: 'Brings historical civilizations to life with experiential archaeological tours around the Buddhist circuit and mock parliamentary debate sessions.',
      quote: 'Understanding history empowers our youth to shape an empathetic, democratic future.',
      subjects: ['Class 9th & 10th Social Science', 'Heritage & Eco Club']
    },
    {
      id: 'dr_anjali_pandey',
      name: 'Dr. Anjali Pandey',
      hindiName: 'डॉ. अंजलि पाण्डेय',
      role: 'PGT Chemistry & Pre-Medical Wing Coordinator',
      department: 'Science & Senior Secondary',
      category: 'science',
      qualifications: 'M.Sc., Ph.D. Organic Chemistry, B.Ed.',
      experience: '15+ Years Senior Secondary Chemistry',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      specialization: 'Organic Reaction Mechanisms, Chemical Kinetics & NEET Chemistry',
      awards: 'Young Scientist Fellowship Delegate • 6 Research Publications',
      boardRecord: 'School Topper: 99/100 in CBSE Class 12th Chemistry Board Exam',
      bio: 'Leads advanced chemistry wet laboratory training and specialized NEET medical foundation classes at Rahav Public School.',
      quote: 'Hands-on chemical reactions transform abstract textbook theory into enduring curiosity.',
      subjects: ['Class 11th & 12th Chemistry', 'NEET Pre-Medical Foundation']
    },
    {
      id: 'mr_shailendra_singh',
      name: 'Mr. Shailendra Pratap Singh',
      hindiName: 'श्री शैलेन्द्र प्रताप सिंह',
      role: 'Chief Physical Education & Sports Director',
      department: 'Sports & Physical Wellness',
      category: 'sports',
      qualifications: 'M.P.Ed., Certified NIS Athletics Coach',
      experience: '12+ Years Sports Leadership',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
      specialization: 'Track & Field, Volleyball, Badminton, Yoga & Martial Arts',
      awards: 'CBSE East Zone Best Coach Trophy 2023 • State Athletics Gold Medalist',
      boardRecord: '100% First Division in CBSE 12th Physical Education',
      bio: 'Oversees the 400m running track, 3 badminton courts, and inter-school sports tournaments across Gorakhpur and Kushinagar.',
      quote: 'Discipline on the playground builds unbreakable resilience in life.',
      subjects: ['Class 11th & 12th Physical Education', 'Athletics & Badminton Academy']
    },
    {
      id: 'ms_neha_singh',
      name: 'Ms. Neha Singh',
      hindiName: 'सुश्री नेहा सिंह',
      role: 'Head of Early Childhood & Primary Wing (Pre-Nursery to 2nd)',
      department: 'Foundational Stage',
      category: 'primary',
      qualifications: 'B.El.Ed., AMI International Montessori Certified',
      experience: '8+ Years Foundational Pedagogy',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&auto=format&fit=crop&q=80',
      specialization: 'Jolly Phonics, Foundational Literacy & Numeracy (FLN), Montessori Play',
      awards: 'Excellence in Early Childhood Education (ECCEd) Award 2022',
      boardRecord: '100% Reading Readiness in Kindergarten Transition',
      bio: 'Creates a joyful, child-centric learning sanctuary where young toddlers develop phonics, sensory coordination, and early storytelling confidence.',
      quote: 'A playful, love-filled foundational environment inspires joyful, lifelong learners.',
      subjects: ['Foundational Phonics & Storytelling', 'Play-Way Math Readiness']
    }
  ]

};
