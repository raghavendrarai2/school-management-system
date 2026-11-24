# 🏫 Rahav Public School - Cloud Management Suite
### राघव पब्लिक स्कूल • गोरखपुर-कुशीनगर (उत्तर प्रदेश)
**CBSE Affiliation No. 2132984 | School Code: 71092**

A modern, cloud-based School ERP and Management System UI Prototype designed specifically for Indian educational institutions (Gorakhpur, Kushinagar & Purvanchal region).

---

## 🌟 Live Interactive Prototype

- **Live Local URL**: `http://localhost:3000`
- **Zero Configuration**: Built with clean Vanilla JavaScript, Tailwind CSS, and semantic components. Works directly in any browser.
- **Dual View Modes**:
  1. **🖥️ Desktop Management Portal**: Full ERP interface for administration and academics.
  2. **📱 Native Mobile App Simulator**: Interactive smartphone device frame (iPhone / Android) with notch, bottom tab navigation, touch cards, and push notifications preview.

---

## 👥 Multi-Role Hierarchy & Key Differences

Use the top floating bar in the application to seamlessly switch between any role:

| Role | Persona Name | Key Responsibilities & Powers |
| :--- | :--- | :--- |
| **👑 Super Admin** | **Er. Raghavendra Singh** (*School Founder & Owner*) | • **Main School Owner**: Onboards all faculty & staff.<br>• **Assigns Staff Roles**: Designates whether a staff member is **Principal**, **Admin**, or **Teacher**.<br>• **Grievance Oversight**: Complete access to all complaints filed by parents across all classes.<br>• **Institutional Finance**: Approves teacher payroll and overall budget. |
| **🏢 Admin** | **Anand Mishra** (*Registrar & Fee Accounts Officer*) | • **Onboards Students & Parents**: Creates student records, linked parent login credentials, admission numbers.<br>• **Fee Collection Counter**: Collects child fees offline or online (Cash, UPI QR, POS Card, Cheque) and generates instant official fee tax slips.<br>• **Admissions Management**: Manages student document verification and admission CRM. |
| **🎓 Principal** | **Dr. Surendra K. Mishra** (*Principal & Senior Mentor*) | • **Assigns Academic Roles**: Appoints which teacher is **Class Teacher of a section** (e.g. appoints Mrs. Sunita Verma to Class 10-A) and allocates teaching subjects.<br>• **Examination Module**: Creates exam datesheets (shifts, hall allocation) and assigns invigilation duties.<br>• **Resolves Complaints**: Reviews and responds to parent grievances alongside the Class Teacher and Super Admin.<br>• **Student Leave Approvals**: Reviews and approves student leave requests.<br>• **Dual Role (Teaching Mode)**: Teaches Class 12th Advanced Physics. |
| **👩‍🏫 Teacher / Class Teacher** | **Mrs. Sunita Verma** (*TGT Math, Class 10-A*) | • **Class Teacher Desk**: Daily monitoring of Class 10-A (45 students).<br>• **Student Leave Applications**: Reviews leave applied by parents for Class 10-A (Aarav Sharma) with 1-click **Approve/Reject**.<br>• **Parent Complaints (Class 10-A)**: Receives parent complaints for her class, responds with action taken.<br>• **Academics**: Daily timetable, assigns homework, live inline exam marks entry grid with auto-grading, CBSE marksheet compiler.<br>• **Parent Notices**: Dispatches circulars via WhatsApp & SMS. |
| **👨‍👩‍👦 Parent** | **Mr. Rajesh Sharma** (*Father of Aarav, 10-A*) | • **Apply Leave for Child**: Submits formal leave applications (From/To dates, medical/family reasons, description) and tracks approval status.<br>• **Lodge Complaint / Grievance**: Submits support tickets (Transport, Academics, etc.) visible to Class Teacher, Principal, and Super Admin.<br>• **Fee Management**: Current due balance (**₹12,500**), UPI payment simulation, downloadable official receipts.<br>• **Child Progress & Attendance**: Term 1 report card, monthly attendance calendar.<br>• **School Circulars & Inbox**: **Read-Only!** Parent reads received WhatsApp/SMS circulars (cannot dispatch notifications). |
| **🎒 Student** | **Aarav Sharma** (*Class 10-A, Roll 14*) | • **Daily Schedule**: 8 periods with timings, room numbers, and teacher names.<br>• **Homework Desk**: Active tasks, deadlines, teacher remarks, and solution file upload modal.<br>• **Exam Scorecard**: Half-yearly marks, class rank (#3/45), and co-scholastic grades.<br>• **Attendance Tracker**: 94.5% overall attendance calendar and view leave status applied by parent. |
| **🌐 Public Portal** | Prospective Parents / Visitors | • **School Advertisement**: Highlights *प्रवेश प्रारंभ सत्र 2026-2027*, STEM labs, and bus fleet connecting Gorakhpur and Kushinagar.<br>• **Public Fee Structure**: Transparent class-wise fee table.<br>• **Online Admission Form**: Parents submit child details with instant sync into Admin CRM.<br>• **🎨 Hindi Banner Studio**: Custom flex hoarding and WhatsApp status card generator with customizable Hindi headlines, tagline, colors, and high-res export. |

---

## 📦 Key Workflows Implemented in the Prototype

### 1. 📝 Parent Leave Application Workflow
1. Parent logs into the Parent Portal or Parent Mobile App.
2. Clicks **"Apply Leave for Child"** &rarr; Enters dates, reason category (Family Wedding, Medical, Emergency), and explanation.
3. The leave application appears in the **Class Teacher (Mrs. Sunita Verma)** and **Principal** consoles with status `Pending Approval`.
4. Class Teacher or Principal clicks **"Approve Leave"** (with optional remarks) &rarr; Status changes to `Approved` and updates the student attendance logs.

### 2. 🗣️ Parent Complaints & Multi-Tier Grievance Redressal
1. Parent logs into the Parent Portal &rarr; Clicks **"Lodge Complaint / Grievance"**.
2. Selects category (*Transport / School Bus*, *Academics*, *Discipline*, *Canteen*, *Fee Inquiry*), enters subject and description.
3. Automatically visible to all three relevant tiers:
   - **Class Teacher**: Can see complaints regarding students in her class (Class 10-A) and post replies.
   - **Principal**: Can see all complaints across the school and take administrative action.
   - **Super Admin (School Owner)**: Has direct oversight of all complaints to ensure resolution quality.
4. Official replies and status changes (`In Progress`, `Resolved`) are tracked in real-time.

### 3. 👥 Super Admin vs Admin Differentiation
- **Super Admin (Owner)**:
  - Onboards new teachers, administrative personnel, and the Principal.
  - Changes high-level staff system roles (`Teacher` &harr; `Admin` &harr; `Principal`).
  - Oversees school-wide grievances and institutional finance.
- **Admin (Registrar & Fee Accounts)**:
  - Onboards student records and creates linked parent accounts.
  - Manages the **Fee Collection Counter**: searches student, collects cash/card/UPI fees, and issues official fee tax slips.

### 4. 👩‍🏫 Principal Role Assignments
- The Principal has dedicated tools to assign academic roles:
  - Selects any teacher and designates them as **Class Teacher of a section** (e.g. Class 10-A, Class 9-B) or **Subject Teacher only**.
  - Allocates subjects and sections to each teacher.

### 5. 📬 Notification Visibility Rules
- Parents **cannot send notifications**; they have a dedicated **Read-Only School Circulars & Inbox** where they view circulars received via WhatsApp, SMS, and App Push.
- Notice dispatch is strictly restricted to School Staff (**Teacher**, **Admin**, **Principal**, **Super Admin**).
