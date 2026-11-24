/**
 * Rahav Public School - Cloud Management Software Frontend Application
 * Pure Vanilla JavaScript UI Controller with State Management
 * Includes Login Portal, Super Admin, Admin, Principal, Class Teacher (Attendance/Marksheet),
 * Subject Teacher, Parent, Student, Public Portal & Mobile App Simulator.
 */

(function () {
  // Application State
  const state = {
    isLoggedIn: false, // Starts on Login Portal as requested by user!
    currentRole: 'super_admin', // super_admin, admin, principal, teacher, subject_teacher, parent, student, public
    viewMode: 'desktop',  // desktop, mobile
    mobileRole: 'parent', // student, parent, teacher
    activeTab: 'overview',
    selectedParentCam: 'cam_10a_rear',
    selectedAdminCam: 'cam_10a_front',
    selectedAdminFilter: 'all',
    selectedFacultyCategory: 'all',
    data: window.SchoolData,
    toastTimeout: null,
    currentBannerTemplate: 0,
    bannerCustom: {
      titleHindi: "प्रवेश प्रारंभ सत्र 2026-2027",
      titleEnglish: "Admissions Open for Session 2026-27",
      subtitleHindi: "प्ले ग्रुप से कक्षा 12वीं तक (सीबीएसई बोर्ड)",
      subtitleEnglish: "Pre-Nursery to Class 12th • Science, Commerce & Humanities",
      tag: "गोरखपुर एवं कुशीनगर का सर्वश्रेष्ठ डिजिटल स्मार्ट विद्यालय",
      contactText: "संपर्क करें: 94520-88910, 91250-44321 | एन.एच. 28, कुशीनगर",
      themeColor: "from-blue-800 via-indigo-900 to-amber-700"
    }
  };

  const appContainer = document.getElementById('app-root');

  // Utility Toast Notification
  function showToast(message, type = 'success') {
    if (state.toastTimeout) clearTimeout(state.toastTimeout);
    
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      document.body.appendChild(toast);
    }

    const bgColors = {
      success: 'bg-emerald-600 text-white',
      info: 'bg-blue-600 text-white',
      warning: 'bg-amber-600 text-white',
      purple: 'bg-purple-600 text-white',
      whatsapp: 'bg-emerald-500 text-white'
    };

    toast.className = `fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 ${bgColors[type] || bgColors.success}`;
    toast.innerHTML = `
      <div class="flex items-center gap-2 font-medium text-xs">
        <span>${message}</span>
      </div>
      <button onclick="this.parentElement.remove()" class="ml-2 text-white/80 hover:text-white">&times;</button>
    `;

    state.toastTimeout = setTimeout(() => {
      if (toast && toast.parentElement) {
        toast.className += ' translate-y-4 opacity-0 pointer-events-none';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }
  window.showToast = showToast;

  function mapRoleToMobileRole(role) {
    if (role === 'teacher' || role === 'subject_teacher') return 'teacher';
    if (role === 'student') return 'student';
    if (role === 'principal') return 'principal';
    if (role === 'admin') return 'admin';
    if (role === 'super_admin') return 'super_admin';
    return 'parent';
  }

  // Login handler
  window.loginAsRole = function(role) {
    state.isLoggedIn = true;
    state.currentRole = role;
    state.mobileRole = mapRoleToMobileRole(role);
    state.activeTab = 'overview';
    if (role === 'public') state.activeTab = 'home';
    renderApp();
    showToast(`Logged in as ${getUserDisplayName(role)} (${role.replace('_', ' ').toUpperCase()})`, 'success');
  };

  // Logout handler to return to login portal
  window.logout = function() {
    state.isLoggedIn = false;
    renderApp();
    showToast('Logged out. Please select a role on the login portal.', 'info');
  };

  // Role Switcher while logged in
  window.setRole = function (role) {
    state.currentRole = role;
    state.mobileRole = mapRoleToMobileRole(role);
    state.activeTab = 'overview';
    if (role === 'public') state.activeTab = 'home';
    renderApp();
    showToast(`Switched to ${role.replace('_', ' ').toUpperCase()}: ${getUserDisplayName(role)}`, 'info');
  };

  window.setViewMode = function (mode) {
    state.viewMode = mode;
    if (mode === 'mobile') {
      state.mobileRole = mapRoleToMobileRole(state.currentRole);
    }
    renderApp();
    showToast(`Display set to ${mode === 'mobile' ? 'Mobile App Simulator' : 'Desktop Portal'}`, 'info');
  };

  window.setMobileRole = function (role) {
    state.mobileRole = role;
    renderApp();
    showToast(`Viewing Mobile App: ${role.replace('_', ' ').toUpperCase()}`, 'info');
  };

  window.setActiveTab = function (tab) {
    state.activeTab = tab;
    renderApp();
  };

  function getUserDisplayName(role) {
    if (role === 'public') return 'Public Visitor / Website';
    const user = state.data.users[role];
    return user ? user.name : role;
  }

  // --------------------------------------------------------------------------
  // LOGIN PORTAL (Asks for Role on Login Screen)
  // --------------------------------------------------------------------------
  function renderLoginPortal() {
    return `
      <div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col justify-between p-4 sm:p-8">
        <!-- Top branding -->
        <header class="max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-2xl shadow-lg border border-amber-300">
              RPS
            </div>
            <div>
              <h1 class="text-xl font-bold tracking-wide">RAHAV PUBLIC SCHOOL</h1>
              <p class="text-xs text-amber-300 font-hindi">राघव पब्लिक स्कूल • गोरखपुर-कुशीनगर राष्ट्रीय राजमार्ग (सीबीएसई संबद्ध)</p>
            </div>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Cloud ERP Suite v3.2</span>
            <button onclick="loginAsRole('public')" class="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium border border-white/20">
              🌐 View Public Website &rarr;
            </button>
          </div>
        </header>

        <!-- Main Login Card & Role Selector -->
        <main class="max-w-6xl w-full mx-auto my-8 space-y-6">
          <div class="text-center space-y-2 max-w-2xl mx-auto">
            <span class="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              Interactive Multi-Role UI Demo
            </span>
            <h2 class="text-3xl font-extrabold tracking-tight">Select Your Role to Access Cloud ERP</h2>
            <p class="text-xs text-slate-400">
              Click any role card below to test its dedicated permissions, workflows, and responsibilities.
            </p>
          </div>

          <!-- Persona Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- 1. Super Admin (Owner) -->
            <div onclick="loginAsRole('super_admin')" class="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-purple-500/40 hover:border-purple-400 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl p-2 bg-purple-500/20 rounded-xl">👑</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">School Owner</span>
                </div>
                <h3 class="font-bold text-base text-white group-hover:text-purple-300">Super Admin</h3>
                <p class="text-xs text-slate-400 font-semibold">Er. Raghavendra Singh</p>
                <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Onboards faculty & staff, assigns system roles (Principal, Admin, Teacher), supervises all parent complaints.
                </p>
              </div>
              <button class="mt-4 w-full py-1.5 bg-purple-600 group-hover:bg-purple-500 text-white font-bold rounded-xl text-xs shadow">
                Log In as Super Admin &rarr;
              </button>
            </div>

            <!-- 2. Admin (Registrar & Fees) -->
            <div onclick="loginAsRole('admin')" class="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-indigo-500/40 hover:border-indigo-400 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl p-2 bg-indigo-500/20 rounded-xl">🏢</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Accounts & Reg.</span>
                </div>
                <h3 class="font-bold text-base text-white group-hover:text-indigo-300">Admin</h3>
                <p class="text-xs text-slate-400 font-semibold">Anand Mishra</p>
                <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Onboards students & creates parent accounts, collects child fees at counter (Cash/UPI/POS/Cheque) & slips.
                </p>
              </div>
              <button class="mt-4 w-full py-1.5 bg-indigo-600 group-hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow">
                Log In as Admin &rarr;
              </button>
            </div>

            <!-- 3. Principal -->
            <div onclick="loginAsRole('principal')" class="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-blue-500/40 hover:border-blue-400 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl p-2 bg-blue-500/20 rounded-xl">🎓</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Academic Head</span>
                </div>
                <h3 class="font-bold text-base text-white group-hover:text-blue-300">Principal</h3>
                <p class="text-xs text-slate-400 font-semibold">Dr. Surendra K. Mishra</p>
                <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Assigns Class Teacher & subject duties, exam datesheets & invigilation, grievance redressal, physics teaching.
                </p>
              </div>
              <button class="mt-4 w-full py-1.5 bg-blue-600 group-hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow">
                Log In as Principal &rarr;
              </button>
            </div>

            <!-- 4. Class Teacher (Class 10-A) -->
            <div onclick="loginAsRole('teacher')" class="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl p-2 bg-emerald-500/20 rounded-xl">👩‍🏫</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-hindi">कक्षाध्यापक 10-A</span>
                </div>
                <h3 class="font-bold text-base text-white group-hover:text-emerald-300">Class Teacher</h3>
                <p class="text-xs text-slate-400 font-semibold">Mrs. Sunita Verma (10-A)</p>
                <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Takes daily morning attendance, prepares full class marksheet, PTM coordination, student leave approvals.
                </p>
              </div>
              <button class="mt-4 w-full py-1.5 bg-emerald-600 group-hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow">
                Log In as Class Teacher &rarr;
              </button>
            </div>

            <!-- 5. Subject Teacher (English) -->
            <div onclick="loginAsRole('subject_teacher')" class="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-teal-500/40 hover:border-teal-400 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl p-2 bg-teal-500/20 rounded-xl">👨‍🏫</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">Subject Only</span>
                </div>
                <h3 class="font-bold text-base text-white group-hover:text-teal-300">Subject Teacher</h3>
                <p class="text-xs text-slate-400 font-semibold">Mr. Rohit Pandey (English)</p>
                <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Teaches English, assigns subject homework, enters English exam marks. No attendance or full marksheet rights.
                </p>
              </div>
              <button class="mt-4 w-full py-1.5 bg-teal-600 group-hover:bg-teal-500 text-white font-bold rounded-xl text-xs shadow">
                Log In as Subject Teacher &rarr;
              </button>
            </div>

            <!-- 6. Parent -->
            <div onclick="loginAsRole('parent')" class="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl p-2 bg-amber-500/20 rounded-xl">👨‍👩‍👦</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Guardian</span>
                </div>
                <h3 class="font-bold text-base text-white group-hover:text-amber-300">Parent</h3>
                <p class="text-xs text-slate-400 font-semibold">Mr. Rajesh Sharma (Aarav's Father)</p>
                <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Applies leave for child, lodges complaints/grievances, fee dues & UPI pay (₹12,500), read-only notice inbox.
                </p>
              </div>
              <button class="mt-4 w-full py-1.5 bg-amber-600 group-hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow">
                Log In as Parent &rarr;
              </button>
            </div>

            <!-- 7. Student -->
            <div onclick="loginAsRole('student')" class="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl p-2 bg-cyan-500/20 rounded-xl">🎒</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Class 10-A</span>
                </div>
                <h3 class="font-bold text-base text-white group-hover:text-cyan-300">Student</h3>
                <p class="text-xs text-slate-400 font-semibold">Aarav Sharma (Roll 14)</p>
                <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Class schedule, homework upload & solutions, half-yearly scorecard, attendance rate & leave status.
                </p>
              </div>
              <button class="mt-4 w-full py-1.5 bg-cyan-600 group-hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow">
                Log In as Student &rarr;
              </button>
            </div>

            <!-- 8. Public Page & Banner -->
            <div onclick="loginAsRole('public')" class="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border-2 border-yellow-500/40 hover:border-yellow-400 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-2xl p-2 bg-yellow-500/20 rounded-xl">🌐</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-hindi">सार्वजनिक</span>
                </div>
                <h3 class="font-bold text-base text-white group-hover:text-yellow-300">Public Portal</h3>
                <p class="text-xs text-slate-400 font-semibold">School Website & Banner Studio</p>
                <p class="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Admissions Open 2026-27, public fee structure, enquiry form, and Hindi promotional banner generator.
                </p>
              </div>
              <button class="mt-4 w-full py-1.5 bg-yellow-600 group-hover:bg-yellow-500 text-slate-950 font-bold rounded-xl text-xs shadow">
                Open Public Website &rarr;
              </button>
            </div>
          </div>
        </main>

        <!-- Footer -->
        <footer class="max-w-6xl w-full mx-auto text-center py-4 border-t border-slate-800 text-xs text-slate-500">
          Rahav Public School, Gorakhpur - Kushinagar Highway (NH-28), UP • Affiliated to CBSE New Delhi (Affil. 2132984)
        </footer>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TOP SWITCHER BAR WHEN LOGGED IN
  // --------------------------------------------------------------------------
  function renderDemoBar() {
    return `
      <header class="demo-top-bar sticky top-0 z-40 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-bold text-slate-950 shadow-md">
            RPS
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm tracking-wide text-white">RAHAV PUBLIC SCHOOL</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">Gorakhpur - Kushinagar</span>
            </div>
            <p class="text-[11px] text-slate-400">Cloud Management Suite • Logged in as: <strong class="text-amber-300">${getUserDisplayName(state.currentRole)}</strong></p>
          </div>
        </div>

        <!-- Quick Switcher & Logout Button -->
        <div class="flex items-center flex-wrap gap-1.5 bg-slate-800/95 p-1 rounded-xl border border-slate-700">
          <button onclick="setRole('super_admin')" class="px-2 py-1 text-xs font-medium rounded-lg transition-all ${state.currentRole === 'super_admin' ? 'bg-purple-600 text-white font-bold' : 'text-slate-300 hover:text-white'}">
            👑 Super Admin
          </button>
          <button onclick="setRole('admin')" class="px-2 py-1 text-xs font-medium rounded-lg transition-all ${state.currentRole === 'admin' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'}">
            🏢 Admin
          </button>
          <button onclick="setRole('principal')" class="px-2 py-1 text-xs font-medium rounded-lg transition-all ${state.currentRole === 'principal' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-white'}">
            🎓 Principal
          </button>
          <button onclick="setRole('teacher')" class="px-2 py-1 text-xs font-medium rounded-lg transition-all ${state.currentRole === 'teacher' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'}">
            👩‍🏫 Class Teacher (10A)
          </button>
          <button onclick="setRole('subject_teacher')" class="px-2 py-1 text-xs font-medium rounded-lg transition-all ${state.currentRole === 'subject_teacher' ? 'bg-teal-600 text-white font-bold' : 'text-slate-300 hover:text-white'}">
            👨‍🏫 Subject Teacher
          </button>
          <button onclick="setRole('parent')" class="px-2 py-1 text-xs font-medium rounded-lg transition-all ${state.currentRole === 'parent' ? 'bg-amber-600 text-white font-bold' : 'text-slate-300 hover:text-white'}">
            👨‍👩‍👦 Parent
          </button>
          <button onclick="setRole('student')" class="px-2 py-1 text-xs font-medium rounded-lg transition-all ${state.currentRole === 'student' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-300 hover:text-white'}">
            🎒 Student
          </button>
          <button onclick="setRole('public')" class="px-2 py-1 text-xs font-medium rounded-lg transition-all ${state.currentRole === 'public' ? 'bg-yellow-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'}">
            🌐 Public
          </button>
        </div>

        <div class="flex items-center gap-2">
          <!-- View Mode Toggle -->
          <div class="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
            <button onclick="setViewMode('desktop')" class="px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium transition-all ${state.viewMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}">
              <span>🖥️ Desktop</span>
            </button>
            <button onclick="setViewMode('mobile')" class="px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium transition-all ${state.viewMode === 'mobile' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">
              <span>📱 Mobile</span>
            </button>
          </div>

          <!-- Logout Button to return to role asking page -->
          <button onclick="logout()" class="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all">
            <span>🚪 Logout</span>
          </button>
        </div>
      </header>
    `;
  }

  // --------------------------------------------------------------------------
  // SIDEBAR
  // --------------------------------------------------------------------------
  function renderSidebar(tabs, activeTab) {
    const user = state.data.users[state.currentRole] || {};
    return `
      <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 flex-shrink-0 min-h-[calc(100vh-56px)]">
        <div>
          <!-- Current User Profile Card -->
          <div class="p-4 border-b border-slate-800 bg-slate-950/40">
            <div class="flex items-center gap-3">
              <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" class="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/50" alt="${user.name}">
              <div class="overflow-hidden">
                <h4 class="text-xs font-bold text-white truncate">${user.name || 'User'}</h4>
                <p class="text-[11px] text-amber-400 font-semibold truncate">${user.badge || user.role}</p>
                <p class="text-[10px] text-slate-400 truncate">${user.title || ''}</p>
              </div>
            </div>
            ${user.isClassTeacher ? `
              <div class="mt-2.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 flex items-center justify-between">
                <span>Class In-Charge: 10th-A</span>
                <span class="text-emerald-400 font-bold">45 Students</span>
              </div>
            ` : ''}
            ${user.role === 'subject_teacher' ? `
              <div class="mt-2.5 px-2 py-1 rounded bg-teal-500/10 border border-teal-500/30 text-[10px] text-teal-300">
                <span>Subject Teacher Only (English)</span>
              </div>
            ` : ''}
          </div>

          <!-- Navigation Links -->
          <nav class="p-3 space-y-1">
            ${tabs.map(tab => `
              <button onclick="setActiveTab('${tab.id}')" class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'}">
                <span class="text-base">${tab.icon}</span>
                <span>${tab.label}</span>
                ${tab.badge ? `<span class="ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${tab.badgeColor || 'bg-indigo-800 text-indigo-200'}">${tab.badge}</span>` : ''}
              </button>
            `).join('')}
          </nav>
        </div>

        <!-- School Info & Logout -->
        <div class="p-4 border-t border-slate-800/80 text-xs bg-slate-950/30 space-y-2">
          <button onclick="logout()" class="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5">
            <span>🚪 Logout / Change Role</span>
          </button>
          <div class="text-[10px] text-slate-500 text-center font-hindi">
            राघव पब्लिक स्कूल • कुशीनगर
          </div>
        </div>
      </aside>
    `;
  }

  // --------------------------------------------------------------------------
  // 1. SUPER ADMIN DASHBOARD (School Owner / Chairman)
  // --------------------------------------------------------------------------
  function renderSuperAdminDashboard() {
    const tabs = [
      { id: 'overview', label: 'Owner Overview', icon: '🏛️' },
      { id: 'cctv_wall', label: 'Campus CCTV Surveillance Wall', icon: '🎥', badge: 'Live 8 Cams', badgeColor: 'bg-rose-700 text-white' },
      { id: 'fleet_tracker', label: 'Fleet GPS Command Center', icon: '🚌', badge: '8 Buses Live', badgeColor: 'bg-indigo-700 text-white' },
      { id: 'onboard_staff', label: 'Onboard Staff & Roles', icon: '👥', badge: 'Super Admin', badgeColor: 'bg-purple-700 text-white' },
      { id: 'complaints', label: 'School Grievance Cell', icon: '🗣️', badge: `${state.data.complaints.length}`, badgeColor: 'bg-amber-600 text-white' },
      { id: 'payroll', label: 'Teacher Payroll & Finance', icon: '💼' },
      { id: 'notices', label: 'Broadcast Directives', icon: '📢' }
    ];

    let content = '';
    if (state.activeTab === 'overview') {
      content = `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-purple-800/40">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">School Owner & Chairman Desk</span>
                <span class="text-xs text-slate-300">Er. Raghavendra Singh</span>
              </div>
              <h2 class="text-2xl font-bold">Rahav Public School Governance Portal</h2>
              <p class="text-xs text-slate-300 mt-1">Super Admin onboards teachers & administrative staff, designates institutional roles (Principal, Admin, Teacher), and supervises all parent complaints.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openOnboardStaffModal()" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
                <span>➕ Onboard Faculty / Staff</span>
              </button>
            </div>
          </div>

          <!-- Quick Surveillance & Fleet Live Banner -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onclick="setActiveTab('cctv_wall')" class="cursor-pointer bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 p-5 rounded-2xl border border-rose-800/40 text-white shadow-lg hover:border-rose-400 transition-all flex items-center justify-between group">
              <div>
                <span class="text-xs font-bold text-rose-300 uppercase flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span> Campus Surveillance Wall
                </span>
                <h3 class="text-xl font-black mt-1 group-hover:text-rose-200">8 / 8 CCTV Cameras Live</h3>
                <p class="text-xs text-slate-300 mt-1">Classrooms, Science Labs & Highway Gate Security &rarr;</p>
              </div>
              <span class="text-4xl p-3 bg-rose-500/20 rounded-2xl group-hover:scale-110 transition-all">🎥</span>
            </div>

            <div onclick="setActiveTab('fleet_tracker')" class="cursor-pointer bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl border border-indigo-800/40 text-white shadow-lg hover:border-indigo-400 transition-all flex items-center justify-between group">
              <div>
                <span class="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> Fleet GPS Command Center
                </span>
                <h3 class="text-xl font-black mt-1 group-hover:text-indigo-200">7 En Route • 1 Standby</h3>
                <p class="text-xs text-slate-300 mt-1">244 Students on Board • Telemetry & Speed Limits &rarr;</p>
              </div>
              <span class="text-4xl p-3 bg-indigo-500/20 rounded-2xl group-hover:scale-110 transition-all">🚌</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Staff & Faculty Count</span>
              <h3 class="text-2xl font-bold text-purple-900 mt-1">58 Staff</h3>
              <p class="text-[11px] text-slate-500 mt-1">1 Principal • 2 Admins • 55 Teachers</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Student Strength</span>
              <h3 class="text-2xl font-bold text-slate-900 mt-1">1,420</h3>
              <p class="text-[11px] text-emerald-600 mt-1">+8.5% YoY Admissions</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Fee Revenue (Q1-Q4)</span>
              <h3 class="text-2xl font-bold text-emerald-700 mt-1">₹1.84 Crore</h3>
              <p class="text-[11px] text-slate-500 mt-1">Collected across 4 Quarters</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Parent Grievances</span>
              <h3 class="text-2xl font-bold text-amber-600 mt-1">${state.data.complaints.length} Active</h3>
              <p class="text-[11px] text-slate-500 mt-1">Direct Owner Oversight</p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm">Key Staff Directory & System Roles</h3>
                  <p class="text-[11px] text-slate-500">Super Admin assigns whether a staff is Principal, Admin, or Teacher</p>
                </div>
                <button onclick="setActiveTab('onboard_staff')" class="text-xs text-purple-700 font-bold hover:underline">Manage &rarr;</button>
              </div>
              <div class="space-y-2">
                ${state.data.staffDirectory.map(st => `
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div class="font-bold text-slate-900">${st.name}</div>
                      <div class="text-[11px] text-slate-500">${st.phone} • ${st.email}</div>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${st.staffRole === 'Principal' ? 'bg-amber-100 text-amber-800' : st.staffRole === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}">
                        ${st.staffRole}
                      </span>
                      <button onclick="openChangeRoleModal('${st.empId}')" class="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded text-[10px] font-semibold">
                        Edit Role
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm">School Parent Complaints & Grievances</h3>
                  <p class="text-[11px] text-slate-500">Super Admin monitors teacher & principal resolutions</p>
                </div>
                <button onclick="setActiveTab('complaints')" class="text-xs text-purple-700 font-bold hover:underline">View All &rarr;</button>
              </div>
              <div class="space-y-3">
                ${state.data.complaints.map(cmp => `
                  <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                    <div class="flex items-center justify-between">
                      <span class="font-mono text-[10px] font-bold text-slate-500">${cmp.ticketNo}</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${cmp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${cmp.status}</span>
                    </div>
                    <h4 class="font-bold text-slate-900">${cmp.subject}</h4>
                    <p class="text-[11px] text-slate-600">From: <strong>${cmp.parentName}</strong> (${cmp.studentName}, ${cmp.class})</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (state.activeTab === 'cctv_wall') {
      content = renderSuperAdminCCTVWall();
    } else if (state.activeTab === 'fleet_tracker') {
      content = renderSuperAdminFleetTracker();
    } else if (state.activeTab === 'onboard_staff') {
      content = renderSuperAdminOnboardStaff();
    } else if (state.activeTab === 'complaints') {
      content = renderComplaintsModule('super_admin');
    } else if (state.activeTab === 'payroll') {
      content = renderAdminPayrollView();
    } else if (state.activeTab === 'notices') {
      content = renderBroadcastCenter();
    }

    return `
      <div class="flex min-h-[calc(100vh-56px)] bg-slate-100">
        ${renderSidebar(tabs, state.activeTab)}
        <main class="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
          ${content}
        </main>
      </div>
    `;
  }

  function renderSuperAdminOnboardStaff() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[11px]">Super Admin Power</span>
              <h2 class="text-xl font-bold text-slate-900">Faculty Onboarding & Staff Role Designation</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Super Admin assigns whether an onboarded staff is Principal, Admin, or Teacher.</p>
          </div>
          <button onclick="openOnboardStaffModal()" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
            <span>➕ Onboard New Faculty / Staff</span>
          </button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Faculty ID</th>
                <th class="py-3 px-4">Staff Name & Contact</th>
                <th class="py-3 px-4">Assigned System Role</th>
                <th class="py-3 px-4">Assigned By</th>
                <th class="py-3 px-4">Academic Duties (Set by Principal)</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.staffDirectory.map(st => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4 font-mono font-medium text-slate-700">${st.empId}</td>
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${st.name}</div>
                    <div class="text-[11px] text-slate-500">${st.phone} • ${st.email}</div>
                  </td>
                  <td class="py-3 px-4">
                    <span class="px-3 py-1 rounded-full text-[11px] font-bold ${st.staffRole === 'Principal' ? 'bg-amber-100 text-amber-900 border border-amber-300' : st.staffRole === 'Admin' ? 'bg-blue-100 text-blue-900 border border-blue-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'}">
                      ${st.staffRole}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-slate-600 text-[11px]">${st.assignedBySuperAdmin}</td>
                  <td class="py-3 px-4 text-slate-700">
                    <div class="font-semibold text-slate-900">${st.classTeacherOf}</div>
                    <div class="text-[10px] text-slate-500">${st.subjectAssignments.join(', ')}</div>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <button onclick="openChangeRoleModal('${st.empId}')" class="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-lg text-[11px]">
                      Change Role
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 2. ADMIN DASHBOARD (Student & Parent Onboarding & Fee Counter)
  // --------------------------------------------------------------------------
  function renderAdminDashboard() {
    const tabs = [
      { id: 'overview', label: 'Admin Desk', icon: '🏢' },
      { id: 'onboard_students', label: 'Onboard Student & Parent', icon: '🎒', badge: 'Core Duty', badgeColor: 'bg-indigo-700 text-white' },
      { id: 'fee_counter', label: 'Fee Collection Counter', icon: '💳', badge: 'Collect Fees', badgeColor: 'bg-emerald-700 text-white' },
      { id: 'admissions', label: 'Admissions & CRM', icon: '📝' },
      { id: 'notices', label: 'Office Circulars', icon: '📢' }
    ];

    let content = '';
    if (state.activeTab === 'overview') {
      content = `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">School Registrar & Accounts</span>
                <span class="text-xs text-slate-300">Anand Mishra (Admin)</span>
              </div>
              <h2 class="text-2xl font-bold">Admin: Student Onboarding & Fee Counter</h2>
              <p class="text-xs text-slate-300 mt-1">Responsible for creating student & parent credentials, registering admissions, and collecting tuition & bus fees.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openOnboardStudentParentModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
                <span>➕ Onboard Student & Parent</span>
              </button>
              <button onclick="setActiveTab('fee_counter')" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
                <span>💳 Fee Collection Counter</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Onboarded Accounts</span>
              <h3 class="text-2xl font-bold text-indigo-900 mt-1">${state.data.onboardedAccounts.length + 1417} Accounts</h3>
              <p class="text-[11px] text-slate-500 mt-1">Full credentials generated for parents</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Today's Counter Fee Collection</span>
              <h3 class="text-2xl font-bold text-emerald-700 mt-1">₹1,48,500</h3>
              <p class="text-[11px] text-slate-500 mt-1">Cash, POS Card & Counter UPI</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Pending Inquiries</span>
              <h3 class="text-2xl font-bold text-amber-600 mt-1">4 Enquiries</h3>
              <p class="text-[11px] text-slate-500 mt-1">Gorakhpur & Kushinagar routes</p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm">Recently Onboarded Students & Parents</h3>
                  <p class="text-[11px] text-slate-500">Accounts created by Admin with parent login</p>
                </div>
                <button onclick="setActiveTab('onboard_students')" class="text-xs text-indigo-700 font-bold hover:underline">All &rarr;</button>
              </div>
              <div class="space-y-2">
                ${state.data.onboardedAccounts.map(acc => `
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div class="font-bold text-slate-900">${acc.studentName} <span class="text-[10px] text-slate-500 font-mono">(${acc.admissionNo})</span></div>
                      <div class="text-[11px] text-slate-600">Parent: ${acc.parentName} • ${acc.parentPhone}</div>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      ${acc.feeStatus}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm">Quick Counter Fee Collection</h3>
                  <p class="text-[11px] text-slate-500">Collect fees directly from child or parent at counter</p>
                </div>
                <button onclick="setActiveTab('fee_counter')" class="text-xs text-indigo-700 font-bold hover:underline">Open Register &rarr;</button>
              </div>
              <div class="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-3">
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="font-bold text-indigo-950">Aarav Sharma (Class 10-A, Roll 14)</h4>
                    <p class="text-[11px] text-slate-500">Father: Mr. Rajesh Sharma • Due: ₹12,500</p>
                  </div>
                  <button onclick="openCollectChildFeeModal('Aarav Sharma', '12500')" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold">
                    Collect ₹12,500
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (state.activeTab === 'onboard_students') {
      content = renderAdminOnboardStudentsView();
    } else if (state.activeTab === 'fee_counter') {
      content = renderAdminFeeCounterView();
    } else if (state.activeTab === 'admissions') {
      content = renderAdminAdmissionsView();
    } else if (state.activeTab === 'notices') {
      content = renderBroadcastCenter();
    }

    return `
      <div class="flex min-h-[calc(100vh-56px)] bg-slate-100">
        ${renderSidebar(tabs, state.activeTab)}
        <main class="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
          ${content}
        </main>
      </div>
    `;
  }

  function renderAdminOnboardStudentsView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[11px]">Admin Core Role</span>
              <h2 class="text-xl font-bold text-slate-900">Onboard Student & Parent Accounts</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Create official student admission records, generate linked parent accounts, and assign class and roll numbers.</p>
          </div>
          <button onclick="openOnboardStudentParentModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
            <span>➕ Create Student & Parent Account</span>
          </button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Admission #</th>
                <th class="py-3 px-4">Student Name & Class</th>
                <th class="py-3 px-4">Parent Details (Linked Login)</th>
                <th class="py-3 px-4">Fee Clearance Status</th>
                <th class="py-3 px-4">Onboarded By</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.onboardedAccounts.map(acc => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4 font-mono font-bold text-indigo-700">${acc.admissionNo}</td>
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${acc.studentName}</div>
                    <div class="text-[11px] text-slate-500">${acc.class}</div>
                  </td>
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${acc.parentName}</div>
                    <div class="text-[11px] text-slate-500">${acc.parentPhone} • ${acc.parentEmail}</div>
                  </td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${acc.feeStatus.includes('Paid') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                      ${acc.feeStatus}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-slate-500 text-[11px]">${acc.onboardedBy}</td>
                  <td class="py-3 px-4 text-right">
                    <button onclick="openCollectChildFeeModal('${acc.studentName}', '12500')" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px]">
                      Collect Fees
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAdminFeeCounterView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">Fee Collection Register</span>
              <h2 class="text-xl font-bold text-slate-900">School Fee Collection Counter</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Admin collects fees directly from child or visiting parents via Cash, Card POS, or UPI QR with instant tax receipt printing.</p>
          </div>
          <button onclick="openCollectChildFeeModal('Aarav Sharma', '12500')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
            <span>💳 Collect Fees for Aarav Sharma</span>
          </button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <input type="text" placeholder="Search student name or admission ID..." class="px-3 py-1.5 border border-slate-300 rounded-lg text-xs w-72">
            <span class="text-xs text-slate-500 font-medium">Showing Class 10-A Outstanding Fee Register</span>
          </div>

          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Roll</th>
                <th class="py-3 px-4">Student Name</th>
                <th class="py-3 px-4">Admission #</th>
                <th class="py-3 px-4">Fee Status</th>
                <th class="py-3 px-4">Pending Due</th>
                <th class="py-3 px-4 text-right">Counter Collection</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.class10Students.map(st => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4 font-bold text-slate-700">${st.rollNo}</td>
                  <td class="py-3 px-4 font-bold text-slate-900">${st.name}</td>
                  <td class="py-3 px-4 font-mono text-slate-500">${st.admissionNo}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${st.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                      ${st.feeStatus}
                    </span>
                  </td>
                  <td class="py-3 px-4 font-bold ${st.feeStatus === 'Paid' ? 'text-slate-400' : 'text-red-600'}">
                    ${st.feeStatus === 'Paid' ? '₹0' : st.feeStatus.replace('Due ', '')}
                  </td>
                  <td class="py-3 px-4 text-right">
                    ${st.feeStatus !== 'Paid' ? `
                      <button onclick="openCollectChildFeeModal('${st.name}', '${st.feeStatus.replace('Due ₹', '').replace(',', '')}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] shadow-sm">
                        Collect Fees
                      </button>
                    ` : `
                      <button onclick="openReceiptModal('RPS/REC/2026/0892', '12,000', '12 Sep 2026')" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-[11px]">
                        Print Slip
                      </button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 3. PRINCIPAL DASHBOARD (Assign Class/Subject Teacher & Exam Module)
  // --------------------------------------------------------------------------
  function renderPrincipalDashboard() {
    const tabs = [
      { id: 'overview', label: 'Principal Desk', icon: '🏛️' },
      { id: 'teacher_assignment', label: 'Assign Class & Subject Teacher', icon: '👩‍🏫', badge: 'Principal Duty', badgeColor: 'bg-indigo-700 text-white' },
      { id: 'exams', label: 'Examination Module', icon: '📝', badge: 'Pre-Board Active', badgeColor: 'bg-red-700 text-white' },
      { id: 'complaints', label: 'Grievance & Complaints', icon: '🗣️', badge: `${state.data.complaints.length}`, badgeColor: 'bg-amber-600 text-white' },
      { id: 'leave_requests', label: 'Student Leave Approvals', icon: '📝', badge: 'Pending', badgeColor: 'bg-emerald-700 text-white' },
      { id: 'timetable', label: 'Class & Time Table', icon: '🗓️' },
      { id: 'as_teacher', label: 'My Classes (Physics)', icon: '📖', badge: 'Teach Mode', badgeColor: 'bg-amber-600 text-white' }
    ];

    let content = '';
    if (state.activeTab === 'overview') {
      content = `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">Academic Head & Mentor</span>
                <span class="text-xs text-slate-300">Dr. Surendra K. Mishra (Principal)</span>
              </div>
              <h2 class="text-2xl font-bold">Principal Academic Management</h2>
              <p class="text-xs text-slate-300 mt-1">Assign Class Teacher & Subject allocations to faculty, schedule CBSE Pre-Board examinations, and resolve parent complaints.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="setActiveTab('teacher_assignment')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
                <span>👩‍🏫 Assign Class / Subject Teachers</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Class Teacher Roles</span>
              <h3 class="text-2xl font-bold text-slate-900 mt-1">12 Classes</h3>
              <p class="text-[11px] text-emerald-600 mt-1">10-A: Mrs. Sunita Verma</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Pre-Board Schedule</span>
              <h3 class="text-2xl font-bold text-red-600 mt-1">6 Papers</h3>
              <p class="text-[11px] text-slate-500 mt-1">Starting 05 December</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Student Leave Requests</span>
              <h3 class="text-2xl font-bold text-amber-600 mt-1">${state.data.leaveApplications.filter(l => l.status.includes('Pending')).length} Pending</h3>
              <p class="text-[11px] text-slate-500 mt-1">Aarav Sharma (3 days leave)</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Parent Complaints</span>
              <h3 class="text-2xl font-bold text-indigo-700 mt-1">${state.data.complaints.length} Filed</h3>
              <p class="text-[11px] text-slate-500 mt-1">Visible to Principal & Teacher</p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm">Teacher Class & Subject Allocations</h3>
                  <p class="text-[11px] text-slate-500">Designated by Principal</p>
                </div>
                <button onclick="setActiveTab('teacher_assignment')" class="text-xs text-indigo-700 font-bold hover:underline">Edit Allocations &rarr;</button>
              </div>
              <div class="space-y-2">
                ${state.data.staffDirectory.filter(s => s.staffRole === 'Teacher').map(t => `
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div class="font-bold text-slate-900">${t.name}</div>
                      <div class="text-[11px] text-indigo-700 font-semibold">Class Teacher: ${t.classTeacherOf}</div>
                    </div>
                    <button onclick="openAssignTeacherRoleModal('${t.empId}')" class="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded text-[11px]">
                      Assign Classes
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm">Parent Complaints & Grievance Cell</h3>
                  <p class="text-[11px] text-slate-500">Shared with Class Teacher & Super Admin</p>
                </div>
                <button onclick="setActiveTab('complaints')" class="text-xs text-indigo-700 font-bold hover:underline">Review &rarr;</button>
              </div>
              <div class="space-y-2">
                ${state.data.complaints.map(c => `
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-slate-900">${c.subject}</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${c.status}</span>
                    </div>
                    <p class="text-[11px] text-slate-600">${c.details}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (state.activeTab === 'teacher_assignment') {
      content = renderPrincipalTeacherAssignmentView();
    } else if (state.activeTab === 'exams') {
      content = renderPrincipalExaminationModule();
    } else if (state.activeTab === 'complaints') {
      content = renderComplaintsModule('principal');
    } else if (state.activeTab === 'leave_requests') {
      content = renderLeaveApprovalsView('principal');
    } else if (state.activeTab === 'timetable') {
      content = renderTimetableModule(true);
    } else if (state.activeTab === 'as_teacher') {
      content = renderPrincipalAsTeacherView();
    }

    return `
      <div class="flex min-h-[calc(100vh-56px)] bg-slate-100">
        ${renderSidebar(tabs, state.activeTab)}
        <main class="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
          ${content}
        </main>
      </div>
    `;
  }

  function renderPrincipalTeacherAssignmentView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[11px]">Principal's Academic Prerogative</span>
              <h2 class="text-xl font-bold text-slate-900">Assign Class Teacher & Subject Allocations</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">The Principal designates which teacher serves as Class Teacher for each section, and allocates teaching subjects & sections.</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Faculty ID</th>
                <th class="py-3 px-4">Teacher Name</th>
                <th class="py-3 px-4">Designated Class Teacher Of</th>
                <th class="py-3 px-4">Allocated Subject(s) & Classes</th>
                <th class="py-3 px-4 text-right">Assign Roles</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.staffDirectory.filter(s => s.staffRole === 'Teacher').map(t => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4 font-mono font-medium text-slate-600">${t.empId}</td>
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${t.name}</div>
                    <div class="text-[11px] text-slate-500">${t.phone}</div>
                  </td>
                  <td class="py-3 px-4">
                    <span class="px-3 py-1 rounded-full text-[11px] font-bold ${t.classTeacherOf.includes('None') ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}">
                      ${t.classTeacherOf}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-slate-700 font-medium">
                    ${t.subjectAssignments.join(', ')}
                  </td>
                  <td class="py-3 px-4 text-right">
                    <button onclick="openAssignTeacherRoleModal('${t.empId}')" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[11px] shadow-sm">
                      Assign Roles
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 4. CLASS TEACHER DASHBOARD (Class 10-A In-Charge: Attendance, Marksheet, Leaves, Complaints)
  // --------------------------------------------------------------------------
  function renderTeacherDashboard() {
    const tabs = [
      { id: 'overview', label: 'Class Teacher Desk', icon: '👩‍🏫' },
      { id: 'class_attendance', label: 'Daily Class Attendance', icon: '📋', badge: 'Core Task', badgeColor: 'bg-emerald-700 text-white' },
      { id: 'marksheet_gen', label: 'Prepare Class Marksheet', icon: '📜', badge: 'Full Class', badgeColor: 'bg-indigo-700 text-white' },
      { id: 'leave_requests', label: 'Student Leave Requests', icon: '📝', badge: '1 Pending', badgeColor: 'bg-amber-600 text-white' },
      { id: 'complaints', label: 'Parent Complaints (10-A)', icon: '🗣️', badge: 'Active', badgeColor: 'bg-red-600 text-white' },
      { id: 'my_classes', label: 'My Teaching Timetable', icon: '🗓️' },
      { id: 'homework', label: 'Assign Homework', icon: '📚' },
      { id: 'marks_entry', label: 'Enter Math Exam Marks', icon: '📝' },
      { id: 'parent_notice', label: 'Send Notice to Parents', icon: '📲', badge: 'WhatsApp / SMS', badgeColor: 'bg-emerald-600 text-white' }
    ];

    let content = '';

    if (state.activeTab === 'overview') {
      content = `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-700/40">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider font-hindi">कक्षाध्यापक (Class In-Charge)</span>
                <span class="text-xs text-emerald-200">Mrs. Sunita Verma • Class 10th - Section A</span>
              </div>
              <h2 class="text-2xl font-bold">Class Teacher Console: Class 10-A</h2>
              <p class="text-xs text-slate-300 mt-1">
                You have primary responsibility for all affairs of Class 10-A: Daily morning roll call/attendance, multi-subject marksheet preparation, PTM meetings, leave approvals, and parent grievances.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="setActiveTab('class_attendance')" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center gap-1.5 animate-pulse">
                <span>📋 Take Today's Attendance</span>
              </button>
              <button onclick="setActiveTab('marksheet_gen')" class="px-4 py-2 bg-white text-emerald-950 hover:bg-slate-100 rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
                <span>📜 Prepare Marksheet</span>
              </button>
            </div>
          </div>

          <!-- Class Teacher 5 Pillars Banner -->
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div class="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
              <span class="text-emerald-800 font-bold">1. Daily Attendance</span>
              <p class="text-[11px] text-emerald-700 mt-1">Morning roll call & absent SMS dispatch.</p>
            </div>
            <div class="bg-indigo-50 border border-indigo-200 p-3.5 rounded-xl">
              <span class="text-indigo-800 font-bold">2. Class Marksheet</span>
              <p class="text-[11px] text-indigo-700 mt-1">Consolidates all 6 subjects for report cards.</p>
            </div>
            <div class="bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
              <span class="text-amber-800 font-bold">3. Leave Approvals</span>
              <p class="text-[11px] text-amber-700 mt-1">Grants or rejects parent leave requests.</p>
            </div>
            <div class="bg-red-50 border border-red-200 p-3.5 rounded-xl">
              <span class="text-red-800 font-bold">4. Parent Complaints</span>
              <p class="text-[11px] text-red-700 mt-1">First point of resolution for 10-A parents.</p>
            </div>
            <div class="bg-purple-50 border border-purple-200 p-3.5 rounded-xl">
              <span class="text-purple-800 font-bold">5. PTM Coordinator</span>
              <p class="text-[11px] text-purple-700 mt-1">Conducts parent-teacher evaluations.</p>
            </div>
          </div>

          <!-- Quick Class 10-A Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">My Class (10-A)</span>
              <h3 class="text-2xl font-bold text-slate-900 mt-1">45 Students</h3>
              <p class="text-[11px] text-emerald-600 mt-1">Roll No. 1 to 45</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Today's Attendance</span>
              <h3 class="text-2xl font-bold text-emerald-700 mt-1">43 / 45 Present</h3>
              <p class="text-[11px] text-slate-500 mt-1">1 Absent • 1 Approved Leave</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Pending Leave Requests</span>
              <h3 class="text-2xl font-bold text-amber-600 mt-1">1 Request</h3>
              <p class="text-[11px] text-slate-500 mt-1">Aarav Sharma (Wedding Leave)</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Parent Complaints (10-A)</span>
              <h3 class="text-2xl font-bold text-red-600 mt-1">1 Ticket</h3>
              <p class="text-[11px] text-slate-500 mt-1">Bus Route 3 delay inquiry</p>
            </div>
          </div>

          <!-- Action Shortcuts -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-slate-900 text-sm">Class 10-A Daily Roll Call Status</h3>
                <button onclick="setActiveTab('class_attendance')" class="text-xs text-emerald-700 font-bold hover:underline">Open Attendance Sheet &rarr;</button>
              </div>
              <p class="text-xs text-slate-600">
                You can mark Present, Absent, or Leave for any student. Click below to submit today's official roll call.
              </p>
              <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex justify-between items-center">
                <span>Date: <strong>Today (24 Nov 2026)</strong></span>
                <span class="font-bold text-emerald-800">43 Present • 1 Absent • 1 Leave</span>
              </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-slate-900 text-sm">Student Leave Applications Desk</h3>
                <button onclick="setActiveTab('leave_requests')" class="text-xs text-emerald-700 font-bold hover:underline">Review &rarr;</button>
              </div>
              ${state.data.leaveApplications.map(lev => `
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                  <div>
                    <span class="font-bold text-slate-900">${lev.studentName} (Roll ${lev.rollNo})</span>
                    <div class="text-[11px] text-slate-500">${lev.fromDate} to ${lev.toDate} (${lev.reasonCategory})</div>
                  </div>
                  ${lev.status === 'Pending Approval' ? `
                    <button onclick="approveLeave('${lev.id}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px]">
                      Approve Leave
                    </button>
                  ` : `
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Approved</span>
                  `}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (state.activeTab === 'class_attendance') {
      content = renderClassTeacherAttendanceView();
    } else if (state.activeTab === 'marksheet_gen') {
      content = renderMarksheetPrepView();
    } else if (state.activeTab === 'leave_requests') {
      content = renderLeaveApprovalsView('teacher');
    } else if (state.activeTab === 'complaints') {
      content = renderComplaintsModule('teacher');
    } else if (state.activeTab === 'my_classes') {
      content = renderTimetableModule(false);
    } else if (state.activeTab === 'homework') {
      content = renderTeacherHomeworkView();
    } else if (state.activeTab === 'marks_entry') {
      content = renderTeacherMarksEntryView();
    } else if (state.activeTab === 'parent_notice') {
      content = renderBroadcastCenter();
    }

    return `
      <div class="flex min-h-[calc(100vh-56px)] bg-slate-100">
        ${renderSidebar(tabs, state.activeTab)}
        <main class="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
          ${content}
        </main>
      </div>
    `;
  }

  // Class Teacher Daily Attendance View
  function renderClassTeacherAttendanceView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px] font-hindi">दैनिक उपस्थिति रजिस्टर</span>
              <h2 class="text-xl font-bold text-slate-900">Class 10-A Morning Attendance Register</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Class Teacher: Mrs. Sunita Verma • Date: <strong>Today (24 Nov 2026)</strong> • 45 Students</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="markAllAttendancePresent()" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold">
              ✅ Mark All Present
            </button>
            <button onclick="saveClassAttendance()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
              <span>💾 Finalize & Dispatch Absent SMS</span>
            </button>
          </div>
        </div>

        <!-- Attendance Stats Pill -->
        <div class="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
          <div class="flex items-center gap-6">
            <div>
              <span class="text-slate-400">Class & Section:</span>
              <strong class="text-white ml-1">Class 10th - Section A</strong>
            </div>
            <div>
              <span class="text-slate-400">Total Strength:</span>
              <strong class="text-white ml-1">45 Students</strong>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              🟢 Present: ${state.data.class10Students.filter(s => (s.todayAttendance || 'Present') === 'Present').length}
            </span>
            <span class="px-3 py-1 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30">
              🔴 Absent: ${state.data.class10Students.filter(s => s.todayAttendance === 'Absent').length}
            </span>
            <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              🟡 Leave: ${state.data.class10Students.filter(s => s.todayAttendance === 'Leave').length}
            </span>
          </div>
        </div>

        <!-- Attendance Marking Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Roll #</th>
                <th class="py-3 px-4">Student Name</th>
                <th class="py-3 px-4">Admission #</th>
                <th class="py-3 px-4">Overall Attendance %</th>
                <th class="py-3 px-4 text-center">Mark Attendance for Today</th>
                <th class="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.class10Students.map(st => {
                const cur = st.todayAttendance || 'Present';
                return `
                  <tr class="hover:bg-slate-50">
                    <td class="py-3 px-4 font-bold text-slate-800">${st.rollNo}</td>
                    <td class="py-3 px-4 font-bold text-slate-900">${st.name}</td>
                    <td class="py-3 px-4 font-mono text-slate-500">${st.admissionNo}</td>
                    <td class="py-3 px-4 font-semibold text-emerald-700">${st.attendance}</td>
                    <td class="py-3 px-4 text-center">
                      <div class="inline-flex items-center p-1 bg-slate-100 rounded-xl gap-1">
                        <button onclick="toggleAttendance(${st.rollNo}, 'Present')" class="px-3 py-1 rounded-lg font-bold text-xs transition-all ${cur === 'Present' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}">
                          P
                        </button>
                        <button onclick="toggleAttendance(${st.rollNo}, 'Absent')" class="px-3 py-1 rounded-lg font-bold text-xs transition-all ${cur === 'Absent' ? 'bg-red-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}">
                          A
                        </button>
                        <button onclick="toggleAttendance(${st.rollNo}, 'Leave')" class="px-3 py-1 rounded-lg font-bold text-xs transition-all ${cur === 'Leave' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}">
                          L
                        </button>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-right">
                      <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${cur === 'Present' ? 'bg-emerald-100 text-emerald-800' : cur === 'Absent' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}">
                        ${cur}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.toggleAttendance = function(rollNo, status) {
    const st = state.data.class10Students.find(s => s.rollNo === rollNo);
    if (st) {
      st.todayAttendance = status;
    }
    renderApp();
  };

  window.markAllAttendancePresent = function() {
    state.data.class10Students.forEach(s => s.todayAttendance = 'Present');
    renderApp();
    showToast('Marked all 45 students of Class 10-A as Present!', 'success');
  };

  window.saveClassAttendance = function() {
    showToast('Class 10-A attendance finalized! SMS dispatched to absentee parents.', 'success');
  };

  // --------------------------------------------------------------------------
  // 5. SUBJECT TEACHER DASHBOARD (English Mentor: Classes, Homework, Marks ONLY)
  // --------------------------------------------------------------------------
  function renderSubjectTeacherDashboard() {
    const tabs = [
      { id: 'overview', label: 'Subject Teacher Desk', icon: '👨‍🏫' },
      { id: 'my_classes', label: 'My English Classes', icon: '🗓️' },
      { id: 'homework', label: 'Assign English Homework', icon: '📚' },
      { id: 'marks_entry', label: 'Enter English Marks', icon: '📝' }
    ];

    let content = '';
    if (state.activeTab === 'overview') {
      content = `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-teal-700/40">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-teal-400 text-slate-950 text-xs font-bold uppercase tracking-wider font-hindi">विषय शिक्षक (Subject Teacher)</span>
                <span class="text-xs text-teal-200">Mr. Rohit Pandey • PGT English</span>
              </div>
              <h2 class="text-2xl font-bold">Subject Teacher Console: English Language & Lit</h2>
              <p class="text-xs text-slate-300 mt-1">
                You teach English across Class 10-A, 10-B, and Class 12th. You assign subject homework and enter English exam marks.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openAssignHomeworkModal('English Language & Lit')" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow">
                ➕ Assign English Homework
              </button>
            </div>
          </div>

          <!-- Difference Notice Banner -->
          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <h4 class="font-bold flex items-center gap-2">
              <span>ℹ️ Role Scope Difference: Subject Teacher vs Class Teacher</span>
            </h4>
            <p>
              As a <strong>Subject Teacher</strong>, you manage curriculum, daily subject lectures, and enter subject test scores for your classes.
            </p>
            <p class="text-[11px] text-amber-800">
              Note: <strong>Daily morning class attendance</strong>, whole-class multi-subject marksheet compilation, and PTM coordination are the exclusive responsibility of the <strong>Class Teacher (Mrs. Sunita Verma for 10-A)</strong>.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">My Teaching Subjects</span>
              <h3 class="text-xl font-bold text-slate-900 mt-1">English Literature</h3>
              <p class="text-[11px] text-teal-600 mt-1">Classes 10-A, 10-B, 12th</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Active English Homework</span>
              <h3 class="text-xl font-bold text-slate-900 mt-1">1 Set</h3>
              <p class="text-[11px] text-slate-500 mt-1">Letter to Editor (Road Safety)</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Pre-Board Evaluation</span>
              <h3 class="text-xl font-bold text-slate-900 mt-1">Paper 1 (05 Dec)</h3>
              <p class="text-[11px] text-slate-500 mt-1">Class 10th English Exam</p>
            </div>
          </div>

          <!-- Today's English Teaching Periods -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 class="font-bold text-slate-900 text-sm">Today's English Class Schedule</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3.5 rounded-xl border border-teal-200 bg-teal-50/50">
                <span class="font-bold text-teal-900">Period 3 (09:30 AM - 10:15 AM)</span>
                <h4 class="font-bold text-slate-900 mt-1">Class 10-A: English Language & Lit</h4>
                <p class="text-[11px] text-slate-500">Room 204 • Formal Letters & Comprehension</p>
              </div>
              <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span class="font-bold text-slate-700">Period 5 (11:20 AM - 12:05 PM)</span>
                <h4 class="font-bold text-slate-900 mt-1">Class 12th Science: English Core</h4>
                <p class="text-[11px] text-slate-500">Room 302 • Flamingos Poetry Section</p>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (state.activeTab === 'my_classes') {
      content = renderTimetableModule(false);
    } else if (state.activeTab === 'homework') {
      content = renderTeacherHomeworkView();
    } else if (state.activeTab === 'marks_entry') {
      content = renderTeacherMarksEntryView();
    }

    return `
      <div class="flex min-h-[calc(100vh-56px)] bg-slate-100">
        ${renderSidebar(tabs, state.activeTab)}
        <main class="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
          ${content}
        </main>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 6. PARENT DASHBOARD
  // --------------------------------------------------------------------------
  
  // --------------------------------------------------------------------------
  // CCTV & BUS TRACKING ACTIONS
  // --------------------------------------------------------------------------
  window.switchParentCCTV = function(camId) {
    state.selectedParentCam = camId;
    renderApp();
    showToast(`Switched to Camera: ${camId.toUpperCase()}`, 'info');
  };

  window.captureSnapshot = function(camName) {
    const timestamp = new Date().toLocaleTimeString();
    showToast(`📸 Snapshot saved: ${camName} at ${timestamp}`, 'success');
  };

  window.sendBusSpeedWarning = function(busId, driverName, speed) {
    showToast(`⚠️ Speed Alert SMS dispatched to ${driverName} (${busId}): Maintain <40 km/h`, 'warning');
  };

  window.sendRouteDelayNotice = function(busId, routeName) {
    showToast(`📢 SMS & WhatsApp alert sent to all parents on ${routeName}: Bus running 6 mins late due to fog`, 'whatsapp');
  };

  window.openCCTVModal = function(camId) {
    const feeds = state.data.cctvFeeds;
    const selected = feeds.find(c => c.id === camId) || feeds[1]; // default 10-A rear

    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in';
    modal.innerHTML = `
      <div class="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-4 md:p-6 shadow-2xl text-white space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-3">
            <span class="flex h-3 w-3 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-base text-white">${selected.name}</h3>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">🔴 LIVE</span>
              </div>
              <p class="text-[11px] text-slate-400 font-mono">${selected.location} • ${selected.resolution} • ${selected.bitrate}</p>
            </div>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-white text-2xl font-bold">&times;</button>
        </div>

        <!-- Camera Angle Selector -->
        <div class="flex flex-wrap gap-2 text-xs">
          ${feeds.map(f => `
            <button onclick="openCCTVModal('${f.id}')" class="px-3 py-1.5 rounded-xl border text-[11px] transition-all ${f.id === selected.id ? 'bg-indigo-600 text-white border-indigo-500 font-bold' : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'}">
              ${f.name.split('(')[0]}
            </button>
          `).join('')}
        </div>

        <!-- Video Player Display Simulation -->
        <div class="relative bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-video flex flex-col justify-between p-4">
          <!-- Top Info Bar -->
          <div class="flex justify-between items-center text-[11px] font-mono text-emerald-400 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-emerald-500/20">
            <span>RPS-CCTV // ${selected.id.toUpperCase()} // 1080p FHD</span>
            <span class="animate-pulse">${new Date().toISOString().replace('T', ' ').substring(0, 19)} IST</span>
          </div>

          <!-- Classroom / Campus Graphical Simulation -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-85">
            <svg viewBox="0 0 800 450" class="w-full h-full">
              <!-- Classroom background -->
              <rect width="800" height="450" fill="#0f172a" />
              <!-- Smart Board in Front -->
              <rect x="220" y="40" width="360" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="3" />
              <text x="240" y="80" fill="#38bdf8" font-size="16" font-family="monospace" font-weight="bold">Smart Interactive Board (CBSE Term-1)</text>
              <text x="240" y="115" fill="#facc15" font-size="20" font-family="serif">x = [-b ± √(b² - 4ac)] / 2a</text>
              <text x="240" y="145" fill="#94a3b8" font-size="14">Mathematics: Chapter 4 Quadratic Equations</text>
              <text x="240" y="175" fill="#34d399" font-size="13">Teacher: Mrs. Sunita Verma | Class 10-A</text>
              <text x="240" y="195" fill="#cbd5e1" font-size="11">Active School Hours: 08:30 AM - 02:30 PM</text>

              <!-- Teacher Silhouette -->
              <circle cx="160" cy="130" r="28" fill="#38bdf8" opacity="0.9" />
              <path d="M120 220 C120 170, 200 170, 200 220 Z" fill="#0284c7" />

              <!-- Student Rows -->
              <!-- Row 1 -->
              <rect x="80" y="270" width="180" height="40" rx="6" fill="#334155" stroke="#475569" />
              <circle cx="120" cy="260" r="18" fill="#64748b" />
              <circle cx="210" cy="260" r="18" fill="#64748b" />
              
              <rect x="310" y="270" width="180" height="40" rx="6" fill="#334155" stroke="#475569" />
              <circle cx="350" cy="260" r="18" fill="#64748b" />
              <circle cx="440" cy="260" r="18" fill="#64748b" />

              <rect x="540" y="270" width="180" height="40" rx="6" fill="#334155" stroke="#475569" />
              <circle cx="580" cy="260" r="18" fill="#64748b" />
              <circle cx="670" cy="260" r="18" fill="#64748b" />

              <!-- Row 2 (Where Aarav Sits Desk 2B) -->
              <rect x="310" y="360" width="180" height="45" rx="6" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2" />
              <!-- Aarav Highlight -->
              <circle cx="360" cy="345" r="22" fill="#f59e0b" />
              <circle cx="450" cy="345" r="20" fill="#64748b" />
              <rect x="305" y="320" width="110" height="20" rx="4" fill="#fbbf24" />
              <text x="312" y="334" fill="#0f172a" font-size="11" font-weight="bold">★ Aarav Sharma</text>
            </svg>
          </div>

          <!-- Bottom Control Overlays -->
          <div class="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-black/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-700 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-slate-300">Live Status:</span>
              <span class="text-emerald-400 font-semibold flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Stream Optimal (25 FPS)
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="captureSnapshot('${selected.name}')" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-600">
                <span>📸 Snapshot</span>
              </button>
              <button onclick="showToast('Audio muted per CBSE Student Privacy Guidelines', 'info')" class="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-xs flex items-center gap-1 border border-slate-700">
                <span>🔇 Audio Muted</span>
              </button>
            </div>
          </div>
        </div>

        <div class="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
          <span>🔒 <strong>CBSE Surveillance Norms:</strong> Authorized stream active for school hours. End-to-end encrypted.</span>
          <button onclick="closeModal()" class="text-indigo-400 font-bold hover:underline">Close View &rarr;</button>
        </div>
      </div>
    `;
  };

  window.openBusTrackingModal = function(busId) {
    const bus = state.data.busFleet.aaravBus;
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl text-xs space-y-5 text-slate-900 border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
              🚌
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-base text-slate-900">${bus.busId} • ${bus.regNo}</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ${bus.status}
                </span>
              </div>
              <p class="text-[11px] text-slate-500">${bus.routeName} • ${bus.model}</p>
            </div>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-2xl font-bold">&times;</button>
        </div>

        <!-- Telemetry & Child Status Header -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div class="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
            <span class="text-[10px] uppercase font-bold text-indigo-700">Live Speed</span>
            <div class="text-xl font-black text-indigo-950 mt-0.5">${bus.currentSpeed} km/h</div>
            <span class="text-[10px] text-emerald-700 font-semibold">Under 40 km/h Limit</span>
          </div>
          <div class="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <span class="text-[10px] uppercase font-bold text-emerald-700">ETA to Drop Stop</span>
            <div class="text-xl font-black text-emerald-950 mt-0.5">${bus.etaToChildStop}</div>
            <span class="text-[10px] text-slate-600">${bus.distanceToChildStop} remaining</span>
          </div>
          <div class="p-3 bg-amber-50 border border-amber-100 rounded-xl">
            <span class="text-[10px] uppercase font-bold text-amber-700">Child on Board</span>
            <div class="text-sm font-bold text-amber-950 mt-1">${bus.childPickupDrop.childName}</div>
            <span class="text-[10px] text-amber-800">Seat #14 (RFID Scanned)</span>
          </div>
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-[10px] uppercase font-bold text-slate-600">GPS Signal</span>
            <div class="text-sm font-bold text-slate-900 mt-1">4G LTE NavIC</div>
            <span class="text-[10px] text-emerald-600 font-bold">● High Accuracy</span>
          </div>
        </div>

        <!-- Interactive Map Graphic Simulation (Gorakhpur - Kushinagar Corridor) -->
        <div class="bg-slate-900 rounded-2xl p-4 text-white space-y-3 shadow-inner">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold flex items-center gap-1.5 text-amber-400">
              <span>📍</span> NH-28 Highway Live Route Polyline
            </span>
            <span class="text-[11px] text-slate-400">Live Tracking at 1-sec intervals</span>
          </div>

          <!-- SVG Simulated Road Map -->
          <div class="bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
            <svg viewBox="0 0 800 160" class="w-full h-32">
              <!-- Road Line -->
              <line x1="40" y1="80" x2="760" y2="80" stroke="#334155" stroke-width="14" stroke-linecap="round" />
              <line x1="40" y1="80" x2="760" y2="80" stroke="#facc15" stroke-width="2" stroke-dasharray="12,12" />

              <!-- Passed Route -->
              <line x1="40" y1="80" x2="480" y2="80" stroke="#10b981" stroke-width="8" stroke-linecap="round" />

              <!-- Stops on Highway -->
              <!-- Stop 1: AIIMS -->
              <circle cx="60" cy="80" r="7" fill="#10b981" />
              <text x="60" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">AIIMS GKP</text>

              <!-- Stop 2: Khorabar -->
              <circle cx="180" cy="80" r="7" fill="#10b981" />
              <text x="180" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">Khorabar</text>

              <!-- Stop 3: Hata -->
              <circle cx="320" cy="80" r="7" fill="#10b981" />
              <text x="320" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">Hata Chauraha</text>

              <!-- Stop 4: Sukrauli (Current) -->
              <circle cx="440" cy="80" r="9" fill="#f59e0b" />
              <text x="440" y="115" fill="#f59e0b" font-weight="bold" font-size="10" text-anchor="middle">Sukrauli (Passed)</text>

              <!-- Live Bus Position Indicator -->
              <g transform="translate(480, 50)">
                <rect x="-30" y="-18" width="60" height="24" rx="6" fill="#3b82f6" stroke="#93c5fd" stroke-width="2" />
                <text x="0" y="-2" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🚌 38 km/h</text>
                <!-- Radar Ripple -->
                <circle cx="0" cy="30" r="14" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.8">
                  <animate attributeName="r" from="6" to="24" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="30" r="6" fill="#3b82f6" />
              </g>

              <!-- Stop 5: Kasia Tiraha -->
              <circle cx="560" cy="80" r="7" fill="#64748b" />
              <text x="560" y="115" fill="#cbd5e1" font-size="10" text-anchor="middle">Kasia Tiraha</text>

              <!-- Stop 6: Aarav's Stop (Toll Plaza) -->
              <circle cx="660" cy="80" r="9" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" />
              <text x="660" y="115" fill="#facc15" font-weight="bold" font-size="11" text-anchor="middle">★ Aarav Stop (ETA 14m)</text>

              <!-- School Campus Final Destination -->
              <circle cx="750" cy="80" r="9" fill="#818cf8" />
              <text x="750" y="115" fill="#a5b4fc" font-size="10" text-anchor="middle">RPS Campus</text>
            </svg>
          </div>
        </div>

        <!-- Driver & Emergency Contact Details -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 class="font-bold text-xs text-slate-900">Driver & Cabin Attendant</h4>
            <div class="space-y-1 text-slate-700">
              <p>Driver: <strong>${bus.driverName}</strong> (Lic. Verified)</p>
              <p>Care Attendant: <strong>${bus.attendantName}</strong></p>
              <div class="flex gap-2 pt-1">
                <a href="tel:${bus.driverPhone}" class="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-indigo-700">
                  <span>📞 Call Driver</span>
                </a>
                <button onclick="showToast('Calling School Transport Desk (+91 94520-88910)...', 'info')" class="px-3 py-1.5 bg-slate-200 text-slate-800 rounded-lg font-bold text-xs hover:bg-slate-300">
                  Transport Desk
                </button>
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <h4 class="font-bold text-xs text-emerald-950">Geofence & Safety Compliance</h4>
            <ul class="text-[11px] text-emerald-900 space-y-1 list-disc list-inside">
              <li>Speed governor locked at 40 km/h (CBSE Compliant)</li>
              <li>Two-way In-Cabin CCTV Active</li>
              <li>Emergency SOS panic buttons on every row</li>
              <li>Female attendant present on all trips</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  };

  function renderParentDashboard() {
    const tabs = [
      { id: 'overview', label: 'Parent Dashboard', icon: '👨‍👩‍👦' },
      { id: 'cctv', label: 'Child Classroom Live CCTV', icon: '🎥', badge: 'Class 10-A', badgeColor: 'bg-rose-600 text-white' },
      { id: 'bus_tracker', label: 'Live Bus GPS Tracker', icon: '🚌', badge: 'Route 04', badgeColor: 'bg-indigo-600 text-white' },
      { id: 'apply_leave', label: 'Apply Leave for Child', icon: '📝', badge: 'Apply Leave', badgeColor: 'bg-emerald-600 text-white' },
      { id: 'complaints', label: 'Lodge Complaint / Grievance', icon: '🗣️', badge: 'Support', badgeColor: 'bg-amber-600 text-white' },
      { id: 'fees_dues', label: 'Fee Payment & History', icon: '💳', badge: 'Due ₹12,500', badgeColor: 'bg-red-600 text-white' },
      { id: 'attendance', label: 'Child Attendance', icon: '📅', badge: '94.5%', badgeColor: 'bg-emerald-600 text-white' },
      { id: 'academics_result', label: 'Report Card & Progress', icon: '📈' },
      { id: 'notices', label: 'School Circulars & Inbox', icon: '📬', badge: 'Read Only', badgeColor: 'bg-slate-700 text-white' }
    ];

    let content = '';
    if (state.activeTab === 'overview') {
      content = `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">Student: Aarav Sharma (Class 10-A)</span>
                <span class="text-xs text-slate-300">Parent: Mr. Rajesh Sharma</span>
              </div>
              <h2 class="text-2xl font-bold">Child Progress & Parent Portal</h2>
              <p class="text-xs text-slate-300 mt-1">Class Teacher: Mrs. Sunita Verma • Principal: Dr. S. K. Mishra</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openApplyLeaveModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
                <span>📝 Apply Leave for Aarav</span>
              </button>
              <button onclick="openLodgeComplaintModal()" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
                <span>🗣️ Lodge Grievance</span>
              </button>
            </div>
          </div>

          <!-- Parent Live Monitoring Tiles -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onclick="setActiveTab('cctv')" class="cursor-pointer bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 p-5 rounded-2xl border border-rose-700/50 text-white shadow-lg hover:border-rose-400 transition-all flex items-center justify-between group">
              <div>
                <span class="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span> Live Classroom Feed
                </span>
                <h3 class="text-lg font-black mt-1 group-hover:text-rose-200">Watch Class 10-A (Aarav)</h3>
                <p class="text-xs text-slate-300 mt-1">Desk Row 2, Seat 3 • Mathematics Period Active &rarr;</p>
              </div>
              <span class="text-3xl p-3 bg-rose-500/20 rounded-2xl group-hover:scale-110 transition-all">🎥</span>
            </div>

            <div onclick="setActiveTab('bus_tracker')" class="cursor-pointer bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl border border-indigo-700/50 text-white shadow-lg hover:border-indigo-400 transition-all flex items-center justify-between group">
              <div>
                <span class="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> Live GPS Bus Tracker
                </span>
                <h3 class="text-lg font-black mt-1 group-hover:text-indigo-200">Bus 04: Near Kasia Tiraha</h3>
                <p class="text-xs text-slate-300 mt-1">ETA to Kushinagar Toll Drop: 14 Mins (38 km/h) &rarr;</p>
              </div>
              <span class="text-3xl p-3 bg-indigo-500/20 rounded-2xl group-hover:scale-110 transition-all">🚌</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Fee Due (Quarter 3)</span>
              <h3 class="text-2xl font-bold text-red-600 mt-1">₹${state.data.feeDetails.currentDue.toLocaleString('en-IN')}</h3>
              <p class="text-[11px] text-slate-500 mt-1">Due by 15 Dec 2026</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Attendance Rate</span>
              <h3 class="text-2xl font-bold text-emerald-600 mt-1">94.5%</h3>
              <p class="text-[11px] text-slate-500 mt-1">Marked by Class Teacher</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Term 1 Aggregate</span>
              <h3 class="text-2xl font-bold text-indigo-700 mt-1">92.4% (A1)</h3>
              <p class="text-[11px] text-slate-500 mt-1">Class Rank: 3rd / 45</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Leave Application</span>
              <h3 class="text-xl font-bold text-amber-600 mt-1">1 Pending</h3>
              <p class="text-[11px] text-slate-500 mt-1">28-30 Nov (Wedding Leave)</p>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm">Leave Applications for Aarav</h3>
                  <p class="text-[11px] text-slate-500">Track approvals by Class Teacher</p>
                </div>
                <button onclick="setActiveTab('apply_leave')" class="text-xs text-indigo-700 font-bold hover:underline">View All &rarr;</button>
              </div>
              <div class="space-y-2">
                ${state.data.leaveApplications.map(lev => `
                  <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-slate-900">${lev.reasonCategory} (${lev.daysCount} Days)</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${lev.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${lev.status}</span>
                    </div>
                    <p class="text-[11px] text-slate-600">${lev.fromDate} to ${lev.toDate}</p>
                    <p class="text-[10px] text-slate-400">Reviewed By: ${lev.reviewedBy}</p>
                  </div>
                `).join('')}
              </div>
              <button onclick="openApplyLeaveModal()" class="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl font-bold text-xs">
                ➕ Apply New Leave Application
              </button>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-sm">My Complaints & Grievances</h3>
                  <p class="text-[11px] text-slate-500">Visible to Class Teacher, Principal & Super Admin</p>
                </div>
                <button onclick="setActiveTab('complaints')" class="text-xs text-indigo-700 font-bold hover:underline">Track &rarr;</button>
              </div>
              <div class="space-y-2">
                ${state.data.complaints.filter(c => c.studentName === 'Aarav Sharma').map(c => `
                  <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-slate-900">${c.subject}</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${c.status}</span>
                    </div>
                    <p class="text-[11px] text-slate-600">${c.details}</p>
                  </div>
                `).join('')}
              </div>
              <button onclick="openLodgeComplaintModal()" class="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl font-bold text-xs">
                🗣️ Lodge New Grievance Ticket
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (state.activeTab === 'cctv') {
      content = renderParentCCTVView();
    } else if (state.activeTab === 'bus_tracker') {
      content = renderParentBusTrackerView();
    } else if (state.activeTab === 'apply_leave') {
      content = renderParentApplyLeaveView();
    } else if (state.activeTab === 'complaints') {
      content = renderParentComplaintsView();
    } else if (state.activeTab === 'fees_dues') {
      content = renderParentFeeDetailView();
    } else if (state.activeTab === 'attendance') {
      content = renderAttendanceCalendarView();
    } else if (state.activeTab === 'academics_result') {
      content = renderMarksheetPrepView();
    } else if (state.activeTab === 'notices') {
      content = renderParentReadOnlyNoticesView();
    }

    return `
      <div class="flex min-h-[calc(100vh-56px)] bg-slate-100">
        ${renderSidebar(tabs, state.activeTab)}
        <main class="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
          ${content}
        </main>
      </div>
    `;
  }

  function renderParentApplyLeaveView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">Parent Leave Desk</span>
              <h2 class="text-xl font-bold text-slate-900">Apply Student Leave (Aarav Sharma)</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Submit formal leave application to Class Teacher Mrs. Sunita Verma and Principal Dr. S. K. Mishra.</p>
          </div>
          <button onclick="openApplyLeaveModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
            <span>➕ Apply New Leave Application</span>
          </button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Leave ID</th>
                <th class="py-3 px-4">Dates & Duration</th>
                <th class="py-3 px-4">Reason Category</th>
                <th class="py-3 px-4">Parent's Description</th>
                <th class="py-3 px-4">Approval Status</th>
                <th class="py-3 px-4">Reviewer Remarks</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.leaveApplications.map(lev => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4 font-mono font-bold text-indigo-700">${lev.id}</td>
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${lev.fromDate} to ${lev.toDate}</div>
                    <div class="text-[11px] text-slate-500">${lev.daysCount} Day(s)</div>
                  </td>
                  <td class="py-3 px-4 font-semibold text-slate-800">${lev.reasonCategory}</td>
                  <td class="py-3 px-4 text-slate-600 max-w-xs">${lev.reasonDetail}</td>
                  <td class="py-3 px-4">
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${lev.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${lev.status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-slate-500 text-[11px]">
                    <div>${lev.reviewedBy}</div>
                    ${lev.teacherRemarks ? `<div class="italic text-emerald-700 mt-0.5">"${lev.teacherRemarks}"</div>` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderParentComplaintsView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[11px]">Grievance Portal</span>
              <h2 class="text-xl font-bold text-slate-900">Lodge Complaint / Support Ticket</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Visible to Class Teacher (Mrs. Sunita Verma), Principal (Dr. S. K. Mishra), and School Super Admin.</p>
          </div>
          <button onclick="openLodgeComplaintModal()" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
            <span>🗣️ Lodge New Complaint</span>
          </button>
        </div>

        <div class="space-y-4">
          ${state.data.complaints.map(cmp => `
            <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-indigo-700">${cmp.ticketNo}</span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">${cmp.category}</span>
                  <span class="text-xs text-slate-400">Filed on ${cmp.date}</span>
                </div>
                <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${cmp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                  ${cmp.status}
                </span>
              </div>
              <h4 class="font-bold text-slate-900 text-sm">${cmp.subject}</h4>
              <p class="text-xs text-slate-600 leading-relaxed">${cmp.details}</p>

              <div class="mt-3 pt-3 border-t border-slate-100 space-y-2">
                <span class="text-[11px] font-bold text-slate-700">Official Responses (${cmp.responses.length}):</span>
                ${cmp.responses.map(r => `
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div class="flex justify-between items-center text-[11px] font-bold text-indigo-900 mb-0.5">
                      <span>${r.author} (${r.role})</span>
                      <span class="text-slate-400 font-normal">${r.time}</span>
                    </div>
                    <p class="text-slate-700">${r.text}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderParentReadOnlyNoticesView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[11px]">Read-Only Inbox</span>
              <h2 class="text-xl font-bold text-slate-900">Official School Circulars & Notifications</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Official circulars, WhatsApp updates, and winter school schedules dispatched to your mobile.</p>
          </div>
          <span class="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
            ✓ WhatsApp & SMS Active
          </span>
        </div>

        <div class="space-y-4">
          ${state.data.notices.map(n => `
            <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700">${n.category}</span>
                <span class="text-xs text-slate-400">${n.date}</span>
              </div>
              <h4 class="font-bold text-slate-900 text-sm">${n.title}</h4>
              <p class="font-hindi text-xs text-slate-700 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 leading-relaxed">${n.hindiContent}</p>
              <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>Issued by: <strong>${n.sentBy}</strong></span>
                <span class="text-emerald-700 font-semibold">Delivered to mobile</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  
  // --------------------------------------------------------------------------
  // PARENT CCTV VIEW
  // --------------------------------------------------------------------------
  function renderParentCCTVView() {
    const feeds = state.data.cctvFeeds.filter(f => f.parentAccessible);
    const selectedId = state.selectedParentCam || 'cam_10a_rear';
    const currentCam = state.data.cctvFeeds.find(c => c.id === selectedId) || feeds[0];

    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span> Live CCTV Feed
              </span>
              <h2 class="text-xl font-bold text-slate-900">Child Classroom Live Monitoring</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Authorized parental access for <strong>Aarav Sharma (Class 10th - Section A)</strong>. Active school hours: 08:30 AM – 02:30 PM.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="captureSnapshot('${currentCam.name}')" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow">
              <span>📸 Capture Snapshot</span>
            </button>
            <button onclick="openCCTVModal('${currentCam.id}')" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow">
              <span>🔲 Enlarge Fullscreen</span>
            </button>
          </div>
        </div>

        <!-- Camera Angle Selector Tabs -->
        <div class="bg-slate-900 p-2 rounded-2xl border border-slate-800 flex flex-wrap gap-2 text-xs">
          ${feeds.map(f => `
            <button onclick="switchParentCCTV('${f.id}')" class="px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${f.id === currentCam.id ? 'bg-rose-600 text-white font-bold shadow-md' : 'bg-slate-800/80 text-slate-300 hover:text-white'}">
              <span>🎥</span>
              <span>${f.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Live CCTV Monitor Player Frame -->
        <div class="bg-black rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl relative">
          <!-- Monitor Top HUD -->
          <div class="flex justify-between items-center text-xs font-mono text-emerald-400 bg-black/75 px-5 py-3 border-b border-emerald-500/20">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1.5 text-rose-400 font-bold">
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> 🔴 LIVE FEED
              </span>
              <span>// RPS-CAM: ${currentCam.id.toUpperCase()}</span>
              <span>// RES: ${currentCam.resolution}</span>
            </div>
            <div class="flex items-center gap-4">
              <span>BITRATE: ${currentCam.bitrate}</span>
              <span class="text-yellow-400">${new Date().toISOString().replace('T', ' ').substring(0, 19)} IST</span>
            </div>
          </div>

          <!-- Graphical Video Simulation -->
          <div class="relative aspect-video w-full bg-slate-950 flex items-center justify-center p-6">
            <svg viewBox="0 0 800 450" class="w-full h-full max-h-[500px]">
              <!-- Room Walls -->
              <rect width="800" height="450" fill="#0f172a" />
              <!-- Windows with Daylight -->
              <rect x="30" y="30" width="100" height="140" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
              <line x1="80" y1="30" x2="80" y2="170" stroke="#38bdf8" stroke-width="1.5" />
              <line x1="30" y1="100" x2="130" y2="100" stroke="#38bdf8" stroke-width="1.5" />

              <!-- Digital Smart Board -->
              <rect x="200" y="30" width="400" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="3" />
              <text x="220" y="65" fill="#38bdf8" font-size="15" font-family="monospace" font-weight="bold">Smart Interactive Board • Class 10-A</text>
              <text x="220" y="105" fill="#facc15" font-size="22" font-family="serif">x = [-b ± √(b² - 4ac)] / 2a</text>
              <text x="220" y="140" fill="#e2e8f0" font-size="13">Subject: Mathematics (CBSE Syllabus)</text>
              <text x="220" y="165" fill="#34d399" font-size="13">Teacher: Mrs. Sunita Verma • Quadratic Equations</text>
              <text x="220" y="195" fill="#94a3b8" font-size="11">Air Quality: Good (AQI 42) • Room Temp: 22°C</text>

              <!-- Teacher Figure -->
              <circle cx="150" cy="130" r="26" fill="#38bdf8" />
              <path d="M110 220 C110 165, 190 165, 190 220 Z" fill="#0284c7" />

              <!-- Student Rows Front -->
              <rect x="70" y="270" width="180" height="40" rx="6" fill="#334155" stroke="#475569" />
              <circle cx="110" cy="260" r="16" fill="#64748b" />
              <circle cx="200" cy="260" r="16" fill="#64748b" />

              <rect x="310" y="270" width="180" height="40" rx="6" fill="#334155" stroke="#475569" />
              <circle cx="350" cy="260" r="16" fill="#64748b" />
              <circle cx="440" cy="260" r="16" fill="#64748b" />

              <rect x="550" y="270" width="180" height="40" rx="6" fill="#334155" stroke="#475569" />
              <circle cx="590" cy="260" r="16" fill="#64748b" />
              <circle cx="680" cy="260" r="16" fill="#64748b" />

              <!-- Student Row 2 (Aarav's Seat Desk 2B) -->
              <rect x="310" y="360" width="180" height="45" rx="6" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2.5" />
              <!-- Aarav Position -->
              <circle cx="360" cy="345" r="22" fill="#f59e0b" />
              <circle cx="450" cy="345" r="18" fill="#64748b" />
              <rect x="300" y="318" width="120" height="22" rx="5" fill="#fbbf24" stroke="#d97706" stroke-width="1.5" />
              <text x="310" y="333" fill="#0f172a" font-size="11" font-weight="black">★ Aarav Sharma</text>
            </svg>
          </div>

          <!-- Bottom Control Strip -->
          <div class="bg-black/90 p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <span class="text-slate-400">Stream Health:</span>
              <span class="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span> 99.8% Uptime (Campus Fiber Optic)
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-slate-400 text-[11px]">Audio transmission muted for CBSE student privacy</span>
              <button onclick="captureSnapshot('${currentCam.name}')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold">
                📸 Snapshot
              </button>
            </div>
          </div>
        </div>

        <!-- Class Academic Context Card -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span class="text-slate-500 font-semibold uppercase text-[10px]">Active Instructor</span>
            <div class="font-bold text-slate-900 text-sm">Mrs. Sunita Verma (Class Teacher)</div>
            <p class="text-slate-600">Subject: TGT Mathematics (Algebra)</p>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span class="text-slate-500 font-semibold uppercase text-[10px]">Current Topic</span>
            <div class="font-bold text-slate-900 text-sm">Chapter 4: Quadratic Equations</div>
            <p class="text-slate-600">Exercise 4.3 working questions in progress</p>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span class="text-slate-500 font-semibold uppercase text-[10px]">Next Period (in 20m)</span>
            <div class="font-bold text-slate-900 text-sm">Class 10-A Science (Physics)</div>
            <p class="text-slate-600">Mentor: Dr. S. K. Mishra (Principal)</p>
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // PARENT BUS TRACKER VIEW
  // --------------------------------------------------------------------------
  function renderParentBusTrackerView() {
    const bus = state.data.busFleet.aaravBus;

    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span> GPS NavIC Active
              </span>
              <h2 class="text-xl font-bold text-slate-900">Live GPS School Bus Tracker (${bus.busId})</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Tracking designated school bus for <strong>Aarav Sharma</strong>: ${bus.routeName} (${bus.regNo}).
            </p>
          </div>
          <div class="flex items-center gap-2">
            <a href="tel:${bus.driverPhone}" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
              <span>📞 Call Driver (${bus.driverName.split(' ')[1]})</span>
            </a>
            <button onclick="openBusTrackingModal('${bus.busId}')" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
              <span>🔲 Enlarge Map</span>
            </button>
          </div>
        </div>

        <!-- Telemetry Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Live Bus Speed</span>
            <div class="text-2xl font-black text-indigo-900 mt-1">${bus.currentSpeed} km/h</div>
            <p class="text-[11px] text-emerald-600 mt-0.5 font-semibold">✓ Safe (< 40 km/h Limit)</p>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-500 uppercase">ETA to Child Stop</span>
            <div class="text-2xl font-black text-emerald-600 mt-1">${bus.etaToChildStop}</div>
            <p class="text-[11px] text-slate-500 mt-0.5">${bus.distanceToChildStop} remaining</p>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Child Pickup / Drop</span>
            <div class="text-sm font-bold text-slate-900 mt-1">${bus.childPickupDrop.stopName}</div>
            <p class="text-[10px] text-emerald-700 font-semibold mt-0.5">Boarded via RFID #14</p>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Cabin Attendant</span>
            <div class="text-sm font-bold text-slate-900 mt-1">${bus.attendantName}</div>
            <p class="text-[10px] text-slate-500 mt-0.5">Verified Female Attendant</p>
          </div>
        </div>

        <!-- Live Highway Route Map -->
        <div class="bg-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl border border-slate-800">
          <div class="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-amber-400 font-bold text-sm">📍 NH-28 Highway Corridor Live Route</span>
              <span class="text-[10px] bg-slate-800 px-2.5 py-0.5 rounded text-slate-300">Gorakhpur AIIMS ➔ Kasia ➔ Kushinagar</span>
            </div>
            <span class="text-emerald-400 font-mono text-[11px]">● Live Satellite Sync (NavIC)</span>
          </div>

          <!-- SVG Visual Map -->
          <div class="bg-slate-950 rounded-2xl p-4 border border-slate-800 overflow-hidden">
            <svg viewBox="0 0 800 160" class="w-full h-36">
              <line x1="40" y1="80" x2="760" y2="80" stroke="#334155" stroke-width="14" stroke-linecap="round" />
              <line x1="40" y1="80" x2="760" y2="80" stroke="#facc15" stroke-width="2" stroke-dasharray="12,12" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="#10b981" stroke-width="8" stroke-linecap="round" />

              <circle cx="60" cy="80" r="7" fill="#10b981" />
              <text x="60" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">AIIMS GKP</text>

              <circle cx="180" cy="80" r="7" fill="#10b981" />
              <text x="180" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">Khorabar</text>

              <circle cx="320" cy="80" r="7" fill="#10b981" />
              <text x="320" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">Hata Chauraha</text>

              <circle cx="440" cy="80" r="9" fill="#f59e0b" />
              <text x="440" y="115" fill="#f59e0b" font-weight="bold" font-size="10" text-anchor="middle">Sukrauli (Passed)</text>

              <!-- Bus Pin -->
              <g transform="translate(480, 50)">
                <rect x="-32" y="-18" width="64" height="24" rx="6" fill="#3b82f6" stroke="#93c5fd" stroke-width="2" />
                <text x="0" y="-2" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🚌 38 km/h</text>
                <circle cx="0" cy="30" r="14" fill="none" stroke="#60a5fa" stroke-width="2">
                  <animate attributeName="r" from="6" to="24" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="30" r="6" fill="#3b82f6" />
              </g>

              <circle cx="560" cy="80" r="7" fill="#64748b" />
              <text x="560" y="115" fill="#cbd5e1" font-size="10" text-anchor="middle">Kasia Tiraha</text>

              <circle cx="660" cy="80" r="10" fill="#fbbf24" stroke="#f59e0b" stroke-width="2.5" />
              <text x="660" y="115" fill="#facc15" font-weight="bold" font-size="11" text-anchor="middle">★ Aarav Stop (ETA 14m)</text>

              <circle cx="750" cy="80" r="9" fill="#818cf8" />
              <text x="750" y="115" fill="#a5b4fc" font-size="10" text-anchor="middle">RPS Campus</text>
            </svg>
          </div>
        </div>

        <!-- Route Stoppages Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
            <span class="font-bold text-slate-800">Route Stoppages & Time Schedule</span>
            <span class="text-slate-500">Route 04: Gorakhpur - Kasia Line</span>
          </div>
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b">
              <tr>
                <th class="py-2.5 px-4">Stop Name</th>
                <th class="py-2.5 px-4">Scheduled Time</th>
                <th class="py-2.5 px-4">Stop Status</th>
                <th class="py-2.5 px-4">Remark</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${bus.stops.map(st => `
                <tr class="hover:bg-slate-50 ${st.name.includes('Aarav') ? 'bg-amber-50/50 font-semibold' : ''}">
                  <td class="py-3 px-4 flex items-center gap-2">
                    <span>${st.status === 'completed' ? '✅' : st.status === 'current' ? '⏳' : '⚪'}</span>
                    <span>${st.name}</span>
                  </td>
                  <td class="py-3 px-4 font-mono text-slate-600">${st.time}</td>
                  <td class="py-3 px-4">
                    <span class="px-2.5 py-0.5 rounded text-[10px] font-bold ${st.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : st.status === 'current' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}">
                      ${st.status.toUpperCase()}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-slate-500 text-[11px]">
                    ${st.name.includes('Aarav') ? 'Designated Drop Point (Mr. Rajesh Sharma)' : 'All students safe'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // SUPER ADMIN CCTV SURVEILLANCE WALL
  // --------------------------------------------------------------------------
  function renderSuperAdminCCTVWall() {
    const feeds = state.data.cctvFeeds;

    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span> Master Security Console
              </span>
              <h2 class="text-xl font-bold text-slate-900">Campus CCTV Surveillance Command Wall</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Super Admin Executive Oversight: Real-time monitoring across <strong>8 Campus Zones</strong> (Smart Classrooms, Science Labs & Highway Gate).
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="showToast('🚨 Emergency Campus Security Protocol Standby: Normal', 'info')" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
              <span>🚨 Campus Alert</span>
            </button>
            <button onclick="showToast('📁 Accessing 30-Day NVR Cloud Archive (18.4 TB / 24 TB)...', 'info')" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
              <span>📁 NVR Archives</span>
            </button>
          </div>
        </div>

        <!-- 8-Camera Wall Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${feeds.map(f => `
            <div class="bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-lg flex flex-col justify-between">
              <!-- Camera Header -->
              <div class="flex justify-between items-center text-[11px] font-mono text-emerald-400 bg-black/80 px-3 py-2 border-b border-slate-800">
                <span class="font-bold truncate text-white">${f.name.split('(')[0]}</span>
                <span class="text-rose-400 font-bold flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> LIVE
                </span>
              </div>

              <!-- Graphic Simulation Box -->
              <div class="relative bg-slate-950 p-3 aspect-video flex items-center justify-center border-b border-slate-800 overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
                  <svg viewBox="0 0 320 180" class="w-full h-full">
                    <rect width="320" height="180" fill="#0f172a" />
                    <!-- Visual element depending on type -->
                    <rect x="60" y="20" width="200" height="90" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
                    <text x="70" y="45" fill="#38bdf8" font-size="10" font-family="monospace">${f.classRoom}</text>
                    <text x="70" y="70" fill="#facc15" font-size="9">${f.activeTeacher}</text>
                    <text x="70" y="90" fill="#94a3b8" font-size="8">${f.currentActivity}</text>
                    <circle cx="40" cy="80" r="14" fill="#0284c7" />
                    <rect x="40" y="130" width="240" height="25" rx="3" fill="#334155" />
                  </svg>
                </div>
                <div class="absolute top-2 left-2 text-[9px] font-mono text-slate-400 bg-black/60 px-1.5 py-0.5 rounded">
                  ${f.id.toUpperCase()} // ${f.resolution}
                </div>
                <div class="absolute bottom-2 right-2 flex gap-1">
                  <button onclick="openCCTVModal('${f.id}')" class="px-2 py-1 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded text-[10px] font-bold shadow">
                    Inspect &rarr;
                  </button>
                </div>
              </div>

              <!-- Camera Footer Details -->
              <div class="p-3 bg-slate-900 text-xs space-y-1 text-slate-300">
                <div class="flex justify-between items-center text-[11px]">
                  <span class="text-slate-400">Activity:</span>
                  <span class="font-semibold text-slate-200 truncate max-w-[180px]">${f.currentActivity}</span>
                </div>
                <div class="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                  <span>Location: ${f.location}</span>
                  <button onclick="captureSnapshot('${f.name}')" class="text-amber-400 hover:underline">Snapshot</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // SUPER ADMIN FLEET GPS TRACKER
  // --------------------------------------------------------------------------
  function renderSuperAdminFleetTracker() {
    const fleet = state.data.busFleet;

    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Fleet Radar
              </span>
              <h2 class="text-xl font-bold text-slate-900">Master School Bus Fleet GPS Command Center</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Live location, vehicle telemetry, speed governors, and panic button status for all <strong>8 School Buses</strong> across Gorakhpur - Kushinagar corridor.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="showToast('📢 All 8 bus routes on schedule. Morning pickup completed at 96.8% punctuality.', 'whatsapp')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
              <span>📢 Broadcast Route Status</span>
            </button>
          </div>
        </div>

        <!-- Fleet Overview Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Total Fleet Size</span>
            <div class="text-2xl font-black text-slate-900 mt-1">8 Buses</div>
            <p class="text-[11px] text-indigo-600 mt-0.5 font-semibold">7 En Route • 1 Standby</p>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Students in Transit</span>
            <div class="text-2xl font-black text-emerald-600 mt-1">244 Students</div>
            <p class="text-[11px] text-slate-500 mt-0.5">RFID Scanned on Board</p>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Speed Limit Alerts</span>
            <div class="text-2xl font-black text-amber-600 mt-1">1 Warning</div>
            <p class="text-[11px] text-amber-700 mt-0.5">Bus 05 @ 41 km/h (>40 km/h)</p>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Emergency SOS Alerts</span>
            <div class="text-2xl font-black text-slate-900 mt-1">0 Incidents</div>
            <p class="text-[11px] text-emerald-600 mt-0.5 font-semibold">All Buses Safe & Verified</p>
          </div>
        </div>

        <!-- Fleet Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
            <span class="font-bold text-slate-800">All 8 GPS-Enabled School Buses</span>
            <span class="text-slate-500">Live 1-sec Telemetry</span>
          </div>
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b">
              <tr>
                <th class="py-3 px-4">Bus ID & Reg</th>
                <th class="py-3 px-4">Route Name</th>
                <th class="py-3 px-4">Driver Name & Contact</th>
                <th class="py-3 px-4">Live Speed</th>
                <th class="py-3 px-4">Students</th>
                <th class="py-3 px-4">Telemetry Status</th>
                <th class="py-3 px-4 text-right">Owner Controls</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${fleet.allBuses.map(b => `
                <tr class="hover:bg-slate-50 ${b.speed > 40 ? 'bg-amber-50/50' : ''}">
                  <td class="py-3 px-4 font-mono font-bold text-slate-900">
                    <div>${b.id}</div>
                    <div class="text-[10px] text-slate-400 font-normal">${b.regNo}</div>
                  </td>
                  <td class="py-3 px-4 text-slate-700 font-medium">${b.route}</td>
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${b.driver}</div>
                    <div class="text-[10px] text-slate-500">${b.phone}</div>
                  </td>
                  <td class="py-3 px-4 font-mono">
                    <span class="px-2 py-0.5 rounded text-[11px] font-black ${b.speed > 40 ? 'bg-red-100 text-red-800 border border-red-300' : b.speed === 0 ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'}">
                      ${b.speed} km/h
                    </span>
                  </td>
                  <td class="py-3 px-4 font-bold text-slate-800">${b.students}</td>
                  <td class="py-3 px-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${b.status.includes('Alert') ? 'bg-amber-100 text-amber-900' : b.speed === 0 ? 'bg-slate-100 text-slate-700' : 'bg-emerald-100 text-emerald-800'}">
                      ${b.status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      <button onclick="openBusTrackingModal('${b.id}')" class="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-[10px]">
                        Track Live
                      </button>
                      ${b.speed > 40 ? `
                        <button onclick="sendBusSpeedWarning('${b.id}', '${b.driver}', ${b.speed})" class="px-2.5 py-1 bg-red-600 text-white font-bold rounded-lg text-[10px]">
                          Speed Warning
                        </button>
                      ` : ''}
                      <button onclick="sendRouteDelayNotice('${b.id}', '${b.route}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-[10px]">
                        Alert Parents
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderComplaintsModule(viewerRole) {
    const roleLabels = {
      super_admin: "Super Admin (Owner Oversight)",
      principal: "Principal Academic Console",
      teacher: "Class Teacher Desk (Class 10-A)"
    };

    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[11px]">Grievance Redressal</span>
              <h2 class="text-xl font-bold text-slate-900">Parent Grievance & Complaint Redressal</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Viewing as: <strong>${roleLabels[viewerRole] || viewerRole}</strong>.</p>
          </div>
        </div>

        <div class="space-y-4">
          ${state.data.complaints.map(cmp => `
            <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-indigo-700">${cmp.ticketNo}</span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">${cmp.category}</span>
                  <span class="text-xs text-slate-500">Student: <strong>${cmp.studentName}</strong> (${cmp.class})</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${cmp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                    ${cmp.status}
                  </span>
                  <button onclick="openReplyComplaintModal('${cmp.id}')" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs shadow-sm">
                    Write Official Reply
                  </button>
                </div>
              </div>

              <div>
                <h4 class="font-bold text-slate-900 text-sm">${cmp.subject}</h4>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">${cmp.details}</p>
                <div class="text-[11px] text-slate-500 mt-1">Parent: <strong>${cmp.parentName}</strong> • Phone: ${cmp.parentPhone}</div>
              </div>

              <div class="mt-3 pt-3 border-t border-slate-100 space-y-2">
                <span class="text-[11px] font-bold text-slate-700">Internal Remarks & Replies:</span>
                ${cmp.responses.map(r => `
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div class="flex justify-between items-center text-[11px] font-bold text-indigo-900 mb-0.5">
                      <span>${r.author} (${r.role})</span>
                      <span class="text-slate-400 font-normal">${r.time}</span>
                    </div>
                    <p class="text-slate-700">${r.text}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderLeaveApprovalsView(reviewerRole) {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">Leave Approval</span>
              <h2 class="text-xl font-bold text-slate-900">Student Leave Applications Desk</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Review leave applications submitted by parents for Class 10-A.</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Leave ID</th>
                <th class="py-3 px-4">Student & Class</th>
                <th class="py-3 px-4">Parent Details</th>
                <th class="py-3 px-4">Dates</th>
                <th class="py-3 px-4">Reason</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.leaveApplications.map(lev => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4 font-mono font-bold text-indigo-700">${lev.id}</td>
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${lev.studentName}</div>
                    <div class="text-[11px] text-slate-500">${lev.class} (Roll ${lev.rollNo})</div>
                  </td>
                  <td class="py-3 px-4">
                    <div>${lev.parentName}</div>
                    <div class="text-[11px] text-slate-500">${lev.parentPhone}</div>
                  </td>
                  <td class="py-3 px-4">
                    <div class="font-semibold text-slate-900">${lev.fromDate} to ${lev.toDate}</div>
                    <div class="text-[10px] text-slate-500">${lev.daysCount} Days</div>
                  </td>
                  <td class="py-3 px-4 max-w-xs">
                    <div class="font-bold text-slate-800">${lev.reasonCategory}</div>
                    <div class="text-[11px] text-slate-500 truncate">${lev.reasonDetail}</div>
                  </td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${lev.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${lev.status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    ${lev.status === 'Pending Approval' ? `
                      <button onclick="approveLeave('${lev.id}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] shadow-sm">
                        Approve
                      </button>
                    ` : `
                      <span class="text-emerald-700 font-bold text-[11px]">Approved</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.approveLeave = function(leaveId) {
    const lev = state.data.leaveApplications.find(l => l.id === leaveId);
    if (lev) {
      lev.status = "Approved";
      lev.reviewedBy = state.data.users[state.currentRole].name;
      lev.teacherRemarks = "Leave granted. Attendance updated accordingly.";
    }
    renderApp();
    showToast(`Leave application ${leaveId} approved!`, 'success');
  };

  // --------------------------------------------------------------------------
  // MODALS
  // --------------------------------------------------------------------------

  window.openApplyLeaveModal = function() {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <div class="flex items-center gap-2">
            <span class="text-lg">📝</span>
            <h3 class="font-bold text-sm text-slate-900">Apply Leave for Aarav Sharma</h3>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="space-y-3">
          <div class="p-3 bg-slate-50 rounded-xl border text-[11px]">
            <div>Student: <strong>Aarav Sharma</strong> (Class 10-A, Roll 14)</div>
            <div>Parent: <strong>Mr. Rajesh Sharma</strong> (+91 94152 77889)</div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">From Date *</label>
              <input id="lev-from" type="date" value="2026-11-28" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
            </div>
            <div>
              <label class="block font-semibold text-slate-700 mb-1">To Date *</label>
              <input id="lev-to" type="date" value="2026-11-30" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Reason Category *</label>
            <select id="lev-cat" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
              <option>Family Wedding / Function</option>
              <option>Medical / Illness</option>
              <option>Urgent Family Emergency</option>
              <option>Out of Station Travel</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Reason Details *</label>
            <textarea id="lev-desc" rows="3" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">Attending elder cousin wedding ceremony in Gorakhpur city.</textarea>
          </div>
        </div>

        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="submitParentLeave()" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow">
            Submit Leave Application
          </button>
        </div>
      </div>
    `;
  };

  window.submitParentLeave = function() {
    const from = document.getElementById('lev-from').value;
    const to = document.getElementById('lev-to').value;
    const cat = document.getElementById('lev-cat').value;
    const desc = document.getElementById('lev-desc').value;

    const newLev = {
      id: `LEV-2026-0${Math.floor(90 + Math.random() * 89)}`,
      studentName: "Aarav Sharma",
      class: "10th - Section A",
      rollNo: 14,
      parentName: "Mr. Rajesh Sharma",
      parentPhone: "+91 94152 77889",
      fromDate: from,
      toDate: to,
      daysCount: 3,
      reasonCategory: cat,
      reasonDetail: desc,
      appliedDate: "Just Now",
      status: "Pending Approval",
      reviewedBy: "Under review by Mrs. Sunita Verma (Class Teacher)",
      teacherRemarks: ""
    };

    state.data.leaveApplications.unshift(newLev);
    closeModal();
    renderApp();
    showToast(`Leave application submitted for ${newLev.fromDate} to ${newLev.toDate}!`, 'success');
  };

  window.openLodgeComplaintModal = function() {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <div class="flex items-center gap-2">
            <span class="text-lg">🗣️</span>
            <h3 class="font-bold text-sm text-slate-900">Lodge Complaint / Grievance</h3>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Grievance Category *</label>
            <select id="cmp-cat" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
              <option>Transport / School Bus Delay</option>
              <option>Academics & Classroom Teaching</option>
              <option>Discipline & Safety</option>
              <option>Canteen & Cleanliness</option>
              <option>Fee & Accounts Inquiry</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Subject / Summary *</label>
            <input id="cmp-sub" type="text" placeholder="e.g. Bus Route 3 morning delay at Hata" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-semibold">
          </div>

          <div>
            <label class="block font-semibold text-slate-700 mb-1">Detailed Explanation *</label>
            <textarea id="cmp-desc" rows="3" placeholder="Provide full details..." class="w-full px-3 py-1.5 border border-slate-300 rounded-lg"></textarea>
          </div>
        </div>

        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="submitParentComplaint()" class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow">
            Submit Grievance Ticket
          </button>
        </div>
      </div>
    `;
  };

  window.submitParentComplaint = function() {
    const cat = document.getElementById('cmp-cat').value;
    const sub = document.getElementById('cmp-sub').value || "General Grievance";
    const desc = document.getElementById('cmp-desc').value || "Parent requested review.";

    const newTicket = {
      id: `CMP-2026-0${Math.floor(50 + Math.random() * 49)}`,
      ticketNo: `#TKT-${Math.floor(4000 + Math.random() * 900)}`,
      studentName: "Aarav Sharma",
      class: "10th - Section A",
      parentName: "Mr. Rajesh Sharma",
      parentPhone: "+91 94152 77889",
      category: cat,
      subject: sub,
      severity: "Medium",
      date: "Just Now",
      status: "In Progress",
      details: desc,
      visibility: ["Class Teacher", "Principal", "Super Admin"],
      responses: [
        { author: "School Helpdesk Bot", role: "System", text: "Dispatched ticket to Class Teacher and Principal.", time: "Just Now" }
      ]
    };

    state.data.complaints.unshift(newTicket);
    closeModal();
    renderApp();
    showToast(`Complaint registered under ${newTicket.ticketNo}!`, 'warning');
  };

  window.openOnboardStaffModal = function() {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Super Admin: Onboard Staff & Assign Role</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Staff Full Name *</label>
            <input id="staff-name" type="text" placeholder="e.g. Mr. Alok Pandey" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Assign Institutional Role *</label>
            <select id="staff-role" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-bold">
              <option value="Teacher">Teacher (Teaching Faculty)</option>
              <option value="Admin">Admin (Admissions & Fee Collector)</option>
              <option value="Principal">Principal (Academic Head)</option>
            </select>
          </div>
        </div>

        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="submitOnboardStaff()" class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow">
            Onboard Staff Member
          </button>
        </div>
      </div>
    `;
  };

  window.submitOnboardStaff = function() {
    const name = document.getElementById('staff-name').value || "New Faculty";
    const role = document.getElementById('staff-role').value;

    state.data.staffDirectory.push({
      empId: `RPS-FAC-0${state.data.staffDirectory.length + 1}`,
      name: name,
      phone: "+91 94520 00000",
      email: "faculty@rahav.edu.in",
      staffRole: role,
      assignedBySuperAdmin: "Er. Raghavendra Singh (Chairman)",
      classTeacherOf: role === 'Teacher' ? "None (Awaiting Principal Assignment)" : "N/A",
      subjectAssignments: ["To be allocated by Principal"]
    });

    closeModal();
    renderApp();
    showToast(`Onboarded ${name} as ${role}!`, 'purple');
  };

  window.openChangeRoleModal = function(empId) {
    const staff = state.data.staffDirectory.find(s => s.empId === empId);
    if (!staff) return;

    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Change Staff Role (Super Admin)</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>
        <p class="text-slate-600">Select new institutional role for <strong>${staff.name}</strong>:</p>
        <select id="new-staff-role" class="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold">
          <option ${staff.staffRole === 'Teacher' ? 'selected' : ''}>Teacher</option>
          <option ${staff.staffRole === 'Admin' ? 'selected' : ''}>Admin</option>
          <option ${staff.staffRole === 'Principal' ? 'selected' : ''}>Principal</option>
        </select>
        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="saveNewStaffRole('${empId}')" class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow">
            Save Role
          </button>
        </div>
      </div>
    `;
  };

  window.saveNewStaffRole = function(empId) {
    const staff = state.data.staffDirectory.find(s => s.empId === empId);
    if (staff) {
      staff.staffRole = document.getElementById('new-staff-role').value;
    }
    closeModal();
    renderApp();
    showToast(`Updated role for ${staff.name} to ${staff.staffRole}!`, 'purple');
  };

  window.openOnboardStudentParentModal = function() {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Admin: Onboard Student & Parent Account</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
            <input id="onb-st-name" type="text" placeholder="e.g. Divyanshu Verma" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Class & Section *</label>
            <select id="onb-st-class" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
              <option>Class 10th - Section A</option>
              <option>Class 9th</option>
              <option>Class 11th (Science)</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Parent / Father Name *</label>
            <input id="onb-pr-name" type="text" placeholder="e.g. Mr. Anil Verma" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Parent Mobile / WhatsApp *</label>
            <input id="onb-pr-phone" type="tel" placeholder="+91 94520 XXXXX" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
          </div>
        </div>

        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="submitOnboardStudentParent()" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow">
            Create Student & Parent Logins
          </button>
        </div>
      </div>
    `;
  };

  window.submitOnboardStudentParent = function() {
    const stName = document.getElementById('onb-st-name').value || "New Student";
    const stClass = document.getElementById('onb-st-class').value;
    const prName = document.getElementById('onb-pr-name').value || "Guardian";
    const prPhone = document.getElementById('onb-pr-phone').value || "+91 94520 00000";

    state.data.onboardedAccounts.unshift({
      admissionNo: `RPS-2026-1${Math.floor(10 + Math.random() * 89)}`,
      studentName: stName,
      class: stClass,
      parentName: prName,
      parentPhone: prPhone,
      parentEmail: "parent@rahav.edu.in",
      feeStatus: "Deposit Paid ₹12,000",
      onboardedBy: "Anand Mishra (Admin)",
      onboardedDate: "Today"
    });

    closeModal();
    renderApp();
    showToast(`Onboarded student ${stName} and created parent account for ${prName}!`, 'success');
  };

  window.openCollectChildFeeModal = function(studentName, amount) {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Admin Counter: Collect Child Fees</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="p-3 bg-slate-50 rounded-xl border text-[11px] space-y-1">
          <div class="flex justify-between">
            <span>Student Name:</span>
            <strong class="text-slate-900">${studentName}</strong>
          </div>
          <div class="flex justify-between font-bold text-red-600 border-t pt-1">
            <span>Due Amount:</span>
            <span>₹${amount}</span>
          </div>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Collection Payment Mode *</label>
          <select id="counter-mode" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-bold">
            <option>Counter Cash Collection</option>
            <option>UPI QR (PhonePe / GPay at Counter)</option>
            <option>Debit / Credit Card POS</option>
          </select>
        </div>

        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="submitCounterFeeCollection('${studentName}')" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow">
            Collect ₹${amount} & Issue Slip
          </button>
        </div>
      </div>
    `;
  };

  window.submitCounterFeeCollection = function(studentName) {
    const mode = document.getElementById('counter-mode').value;
    const st = state.data.class10Students.find(s => s.name === studentName);
    if (st) st.feeStatus = "Paid";

    if (studentName === 'Aarav Sharma') {
      state.data.feeDetails.currentDue = 0;
      state.data.feeDetails.totalPaid += 12500;
      state.data.feeDetails.status = "Fully Cleared";
    }

    const receiptNo = `RPS/REC/2026/09${Math.floor(10 + Math.random() * 89)}`;
    closeModal();
    renderApp();
    showToast(`Collected ₹12,500 via ${mode} for ${studentName}!`, 'success');
    openReceiptModal(receiptNo, '12,500', 'Today');
  };

  window.openAssignTeacherRoleModal = function(empId) {
    const teacher = state.data.staffDirectory.find(s => s.empId === empId);
    if (!teacher) return;

    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Principal: Assign Class Teacher & Subject</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="space-y-3">
          <p class="font-bold text-slate-900">${teacher.name}</p>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Designate Class Teacher Of *</label>
            <select id="p-assign-class" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-bold">
              <option ${teacher.classTeacherOf === 'Class 10-A' ? 'selected' : ''}>Class 10-A</option>
              <option ${teacher.classTeacherOf === 'Class 10-B' ? 'selected' : ''}>Class 10-B</option>
              <option ${teacher.classTeacherOf === 'Class 11th Science' ? 'selected' : ''}>Class 11th Science</option>
              <option ${teacher.classTeacherOf.includes('None') ? 'selected' : ''}>None (Subject Teacher Only)</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Teaching Subjects & Classes *</label>
            <input id="p-assign-subs" type="text" value="${teacher.subjectAssignments.join(', ')}" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-semibold">
          </div>
        </div>

        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="savePrincipalTeacherAssignment('${empId}')" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow">
            Save Academic Assignment
          </button>
        </div>
      </div>
    `;
  };

  window.savePrincipalTeacherAssignment = function(empId) {
    const teacher = state.data.staffDirectory.find(s => s.empId === empId);
    if (teacher) {
      teacher.classTeacherOf = document.getElementById('p-assign-class').value;
      teacher.subjectAssignments = document.getElementById('p-assign-subs').value.split(',').map(s => s.trim());
    }
    closeModal();
    renderApp();
    showToast(`Updated academic assignment for ${teacher.name}!`, 'info');
  };

  window.openReplyComplaintModal = function(complaintId) {
    const cmp = state.data.complaints.find(c => c.id === complaintId);
    if (!cmp) return;

    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    const reviewer = state.data.users[state.currentRole];

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Reply to Grievance: ${cmp.ticketNo}</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="p-3 bg-slate-50 rounded-xl space-y-1">
          <div class="font-bold text-slate-900">${cmp.subject}</div>
          <p class="text-[11px] text-slate-600">${cmp.details}</p>
        </div>

        <div>
          <label class="block font-semibold text-slate-700 mb-1">Your Official Response</label>
          <textarea id="cmp-reply-text" rows="3" placeholder="Write official reply or action taken..." class="w-full px-3 py-1.5 border border-slate-300 rounded-lg"></textarea>
        </div>

        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="submitComplaintReply('${complaintId}')" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow">
            Post Reply
          </button>
        </div>
      </div>
    `;
  };

  window.submitComplaintReply = function(complaintId) {
    const cmp = state.data.complaints.find(c => c.id === complaintId);
    const reply = document.getElementById('cmp-reply-text').value;
    const reviewer = state.data.users[state.currentRole];

    if (cmp && reply) {
      cmp.status = "Resolved";
      cmp.responses.push({
        author: reviewer.name,
        role: reviewer.badge || state.currentRole,
        text: reply,
        time: "Just Now"
      });
    }
    closeModal();
    renderApp();
    showToast(`Replied to ticket ${cmp.ticketNo}!`, 'success');
  };

  window.closeModal = function() {
    const modal = document.getElementById('app-modal');
    if (modal) modal.remove();
  };

  // --------------------------------------------------------------------------
  // COMMON MODULES (Student, Timetable, Marksheets, etc.)
  // --------------------------------------------------------------------------
  function renderStudentDashboard() {
    const tabs = [
      { id: 'overview', label: 'My Desk', icon: '🎒' },
      { id: 'timetable', label: 'Class Timetable', icon: '🗓️' },
      { id: 'homework', label: 'Homework & Submissions', icon: '📚' },
      { id: 'exam_results', label: 'Exam Results & Grades', icon: '🏆' },
      { id: 'attendance', label: 'My Attendance', icon: '📅' }
    ];

    let content = '';
    if (state.activeTab === 'overview') {
      content = `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">Class 10th - Section A</span>
                <span class="text-xs text-slate-300">Roll No. 14 • Tagore House</span>
              </div>
              <h2 class="text-2xl font-bold">Hello, Aarav Sharma!</h2>
              <p class="text-xs text-slate-300 mt-1">Class Teacher: Mrs. Sunita Verma • Principal: Dr. S. K. Mishra</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Class Rank</span>
              <h3 class="text-2xl font-bold text-amber-600 mt-1">#3 in Class</h3>
              <p class="text-[11px] text-slate-500 mt-1">Out of 45 students</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Overall Attendance</span>
              <h3 class="text-2xl font-bold text-emerald-600 mt-1">94.5%</h3>
              <p class="text-[11px] text-slate-500 mt-1">134 / 142 days present</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Term 1 Percentage</span>
              <h3 class="text-2xl font-bold text-indigo-700 mt-1">92.4%</h3>
              <p class="text-[11px] text-slate-500 mt-1">Grade: A1 Excellent</p>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-xs font-semibold text-slate-500 uppercase">Next Exam</span>
              <h3 class="text-2xl font-bold text-red-600 mt-1">05 Dec</h3>
              <p class="text-[11px] text-slate-500 mt-1">CBSE Pre-Board (English)</p>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="font-bold text-slate-900 text-sm mb-3">Leave Applied by Parent</h3>
            <div class="space-y-2">
              ${state.data.leaveApplications.map(l => `
                <div class="p-3 rounded-xl bg-slate-50 border text-xs flex justify-between">
                  <div>
                    <span class="font-bold text-slate-900">${l.fromDate} to ${l.toDate} (${l.reasonCategory})</span>
                    <p class="text-[11px] text-slate-500 mt-0.5">${l.reasonDetail}</p>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold ${l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${l.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (state.activeTab === 'timetable') {
      content = renderTimetableModule(false);
    } else if (state.activeTab === 'homework') {
      content = renderTeacherHomeworkView();
    } else if (state.activeTab === 'exam_results') {
      content = renderMarksheetPrepView();
    } else if (state.activeTab === 'attendance') {
      content = renderAttendanceCalendarView();
    }

    return `
      <div class="flex min-h-[calc(100vh-56px)] bg-slate-100">
        ${renderSidebar(tabs, state.activeTab)}
        <main class="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
          ${content}
        </main>
      </div>
    `;
  }

  function renderTimetableModule(canEdit = false) {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-xl font-bold text-slate-900">Class Timetable (Class 10-A)</h2>
          <p class="text-xs text-slate-500">8 Periods Daily • Monday to Saturday • Academic Year 2026-27</p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Period</th>
                <th class="py-3 px-4">Time Slot</th>
                <th class="py-3 px-4">Subject</th>
                <th class="py-3 px-4">Subject Teacher</th>
                <th class="py-3 px-4">Room / Lab</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.classTimetable.map(t => `
                <tr class="${t.isBreak ? 'bg-amber-50/50 font-semibold' : 'hover:bg-slate-50'}">
                  <td class="py-3 px-4 font-bold ${t.isBreak ? 'text-amber-800' : 'text-slate-800'}">Period ${t.period}</td>
                  <td class="py-3 px-4 text-slate-600">${t.time}</td>
                  <td class="py-3 px-4 font-bold ${t.isBreak ? 'text-amber-800' : 'text-indigo-700'}">${t.subject}</td>
                  <td class="py-3 px-4 text-slate-700">${t.teacher}</td>
                  <td class="py-3 px-4 text-slate-500">${t.room}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAttendanceCalendarView() {
    const att = state.data.attendanceSummary;
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Student Attendance Summary & Logs</h2>
            <p class="text-xs text-slate-500">Student: Aarav Sharma (Class 10-A)</p>
          </div>
          <div class="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            Overall: ${att.percentage}% Attendance
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-500 font-semibold uppercase">Total Working Days</span>
            <h3 class="text-2xl font-bold text-slate-900 mt-1">${att.totalWorkingDays} Days</h3>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm">
            <span class="text-xs text-emerald-800 font-semibold uppercase">Present Days</span>
            <h3 class="text-2xl font-bold text-emerald-950 mt-1">${att.presentDays} Days</h3>
          </div>
          <div class="bg-red-50 border border-red-200 p-5 rounded-2xl shadow-sm">
            <span class="text-xs text-red-800 font-semibold uppercase">Absent Days</span>
            <h3 class="text-2xl font-bold text-red-700 mt-1">${att.absentDays} Days</h3>
          </div>
          <div class="bg-blue-50 border border-blue-200 p-5 rounded-2xl shadow-sm">
            <span class="text-xs text-blue-800 font-semibold uppercase">Approved Medical Leaves</span>
            <h3 class="text-2xl font-bold text-blue-900 mt-1">${att.leaveDays} Days</h3>
          </div>
        </div>
      </div>
    `;
  }

  function renderParentFeeDetailView() {
    const fee = state.data.feeDetails;
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Student Fee Account & Payment Portal</h2>
            <p class="text-xs text-slate-500">Student: Aarav Sharma • Admission No: ${fee.admissionNo}</p>
          </div>
          <button onclick="openPayFeeModal()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">
            <span>💳 Pay Outstanding ₹${fee.currentDue.toLocaleString('en-IN')}</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs text-slate-500 font-semibold">Total Annual Fee</span>
            <h3 class="text-2xl font-bold text-slate-900 mt-1">₹${fee.totalAnnualFee.toLocaleString('en-IN')}</h3>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm">
            <span class="text-xs text-emerald-800 font-semibold">Paid so far</span>
            <h3 class="text-2xl font-bold text-emerald-950 mt-1">₹${fee.totalPaid.toLocaleString('en-IN')}</h3>
          </div>
          <div class="bg-red-50 border border-red-200 p-5 rounded-2xl shadow-sm">
            <span class="text-xs text-red-800 font-semibold">Current Outstanding</span>
            <h3 class="text-2xl font-bold text-red-700 mt-1">₹${fee.currentDue.toLocaleString('en-IN')}</h3>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-slate-200 font-bold text-sm text-slate-800">
            Payment History & Receipts
          </div>
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Receipt Number</th>
                <th class="py-3 px-4">Payment Date</th>
                <th class="py-3 px-4">Term Description</th>
                <th class="py-3 px-4">Mode</th>
                <th class="py-3 px-4">Amount</th>
                <th class="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${fee.history.map(h => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4 font-mono font-semibold text-slate-800">${h.receiptNo}</td>
                  <td class="py-3 px-4 text-slate-600">${h.date}</td>
                  <td class="py-3 px-4 font-medium text-slate-900">${h.term}</td>
                  <td class="py-3 px-4 text-slate-700">${h.mode}</td>
                  <td class="py-3 px-4 font-bold text-emerald-700">₹${h.amount.toLocaleString('en-IN')}</td>
                  <td class="py-3 px-4 text-right">
                    <button onclick="openReceiptModal('${h.receiptNo}', '${h.amount}', '${h.date}')" class="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg text-[11px]">
                      📄 Slip
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderMarksheetPrepView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Compile & Print Class Marksheet (Class 10-A)</h2>
            <p class="text-xs text-slate-500">Prepared by Class Teacher Mrs. Sunita Verma • Consolidates Math, Science, English, Hindi, SST, AI.</p>
          </div>
          <button onclick="openMarksheetModal()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5">
            <span>🖨️ View & Print Aarav Sharma Marksheet</span>
          </button>
        </div>

        <div class="bg-white p-6 rounded-2xl border-2 border-indigo-100 shadow-lg relative overflow-hidden">
          <div class="text-center pb-4 border-b-2 border-indigo-900/40">
            <h3 class="font-bold text-lg text-indigo-950 uppercase tracking-wide">RAHAV PUBLIC SCHOOL</h3>
            <p class="text-xs text-slate-600">Gorakhpur - Kushinagar Highway, UP • Affiliated to CBSE New Delhi</p>
            <h4 class="font-bold text-sm text-slate-800 mt-2 bg-slate-100 py-1 rounded">HALF-YEARLY PERFORMANCE REPORT CARD • SESSION 2026-27</h4>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
            <div><span class="text-slate-500">Student Name:</span> <strong class="text-slate-900">Aarav Sharma</strong></div>
            <div><span class="text-slate-500">Roll No:</span> <strong class="text-slate-900">14 (Class 10-A)</strong></div>
            <div><span class="text-slate-500">Admission No:</span> <strong class="text-slate-900">RPS-2021-084</strong></div>
            <div><span class="text-slate-500">Class Rank:</span> <strong class="text-emerald-700">3rd / 45</strong></div>
          </div>

          <table class="w-full text-left text-xs border border-slate-200">
            <thead class="bg-indigo-50/70 text-indigo-950 font-bold border-b border-slate-200">
              <tr>
                <th class="py-2 px-3">Subject</th>
                <th class="py-2 px-3">Theory (80)</th>
                <th class="py-2 px-3">Practical (20)</th>
                <th class="py-2 px-3">Total (100)</th>
                <th class="py-2 px-3">Grade</th>
                <th class="py-2 px-3">Highest in Class</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.examResults.subjects.map(s => `
                <tr>
                  <td class="py-2 px-3 font-semibold text-slate-900">${s.name}</td>
                  <td class="py-2 px-3">${s.theory}</td>
                  <td class="py-2 px-3">${s.practical}</td>
                  <td class="py-2 px-3 font-bold text-indigo-700">${s.total}</td>
                  <td class="py-2 px-3 font-bold text-emerald-700">${s.grade}</td>
                  <td class="py-2 px-3 text-slate-500">${s.highestInClass}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="mt-6 pt-4 border-t border-slate-200 flex flex-wrap justify-between items-end text-xs text-slate-600 gap-4">
            <div>
              <p>Overall Percentage: <strong class="text-slate-900 text-sm">92.4%</strong></p>
              <p>Overall Grade: <strong class="text-emerald-700 text-sm">A1</strong></p>
            </div>
            <div class="text-center">
              <div class="font-serif italic text-slate-800 font-bold">Sunita Verma</div>
              <div class="border-t border-slate-400 text-[10px] mt-1 pt-0.5">Class Teacher Signature</div>
            </div>
            <div class="text-center">
              <div class="font-serif italic text-slate-800 font-bold">Dr. S. K. Mishra</div>
              <div class="border-t border-slate-400 text-[10px] mt-1 pt-0.5">Principal's Digital Seal</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTeacherHomeworkView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Homework & Assignment Manager</h2>
            <p class="text-xs text-slate-500">Assign daily homework with attachments, set deadlines, and evaluate student submissions.</p>
          </div>
          <button onclick="openAssignHomeworkModal()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow">
            ➕ Assign New Homework
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${state.data.homeworkList.map(hw => `
            <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">${hw.subject}</span>
                <span class="text-xs text-slate-400">Due: <strong class="text-slate-700">${hw.dueDate}</strong></span>
              </div>
              <h3 class="font-bold text-slate-900 text-sm">${hw.title}</h3>
              <p class="text-xs text-slate-600 leading-relaxed">${hw.description}</p>
              <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span class="text-slate-500">Teacher: ${hw.teacher}</span>
                <button onclick="showToast('Viewing submission list for ${hw.title}', 'info')" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg">
                  View Submissions (42/45)
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderTeacherMarksEntryView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold text-[11px]">Marks Entry Portal</span>
              <h2 class="text-xl font-bold text-slate-900">Class 10-A: Half-Yearly Score Entry</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Directly edit student marks below. Total, grade, and percentile update interactively.</p>
          </div>
          <button onclick="showToast('All marks locked and submitted!', 'success')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow">
            💾 Save Gradebook
          </button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Roll #</th>
                <th class="py-3 px-4">Student Name</th>
                <th class="py-3 px-4">Theory (80)</th>
                <th class="py-3 px-4">Practical (20)</th>
                <th class="py-3 px-4">Total (100)</th>
                <th class="py-3 px-4">Grade</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.class10Students.map(st => {
                const theory = Math.min(80, Math.round(st.mathScore * 0.8));
                const practical = 19;
                const total = theory + practical;
                const grade = total >= 90 ? 'A1' : total >= 80 ? 'A2' : total >= 70 ? 'B1' : 'B2';
                return `
                  <tr class="hover:bg-slate-50">
                    <td class="py-3 px-4 font-bold text-slate-800">${st.rollNo}</td>
                    <td class="py-3 px-4 font-semibold text-slate-900">${st.name}</td>
                    <td class="py-3 px-4">
                      <input type="number" min="0" max="80" value="${theory}" class="w-16 px-2 py-1 border border-slate-300 rounded font-semibold text-slate-900">
                    </td>
                    <td class="py-3 px-4">
                      <input type="number" min="0" max="20" value="${practical}" class="w-16 px-2 py-1 border border-slate-300 rounded font-semibold text-slate-900">
                    </td>
                    <td class="py-3 px-4 font-bold text-indigo-700 text-sm">${total}</td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-0.5 rounded text-[11px] font-bold ${grade === 'A1' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
                        ${grade}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderPrincipalExaminationModule() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-red-100 text-red-800 font-semibold text-[11px]">Examination Cell</span>
              <h2 class="text-xl font-bold text-slate-900">${state.data.examSchedule.title}</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Configure datesheet, assign invigilation duties, verify theory & practical marks, approve marksheet generation.</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Exam Date & Day</th>
                <th class="py-3 px-4">Subject</th>
                <th class="py-3 px-4">Shift & Timing</th>
                <th class="py-3 px-4">Target Classes</th>
                <th class="py-3 px-4">Examination Hall / Rooms</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.examSchedule.dates.map(item => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${item.date}</div>
                    <div class="text-[11px] text-slate-500">${item.day}</div>
                  </td>
                  <td class="py-3 px-4 font-semibold text-indigo-700">${item.subject}</td>
                  <td class="py-3 px-4 text-slate-700">${item.shift}</td>
                  <td class="py-3 px-4 font-medium text-slate-800">${item.classes}</td>
                  <td class="py-3 px-4 text-slate-600">${item.rooms}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderPrincipalAsTeacherView() {
    return `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-amber-600 to-amber-800 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-black/20 text-white text-xs font-semibold uppercase">Dual Role Capability</span>
            <h2 class="text-2xl font-bold mt-1">Teaching Mode: Dr. S. K. Mishra</h2>
            <p class="text-xs text-amber-100 mt-1">Subject: Class 12th Advanced Physics (Electromagnetism & Optics) • Room: Physics Lab 1</p>
          </div>
          <button onclick="openAssignHomeworkModal('Physics 12th')" class="px-4 py-2 bg-white text-amber-900 hover:bg-amber-50 rounded-xl text-xs font-bold shadow">
            ➕ Assign Physics Homework
          </button>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 class="font-bold text-slate-900 text-sm">Today's Teaching Schedule for Principal</h3>
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span class="font-bold text-indigo-700">Period 2 (08:45 AM - 09:30 AM)</span>
              <h4 class="font-bold text-slate-900 mt-0.5">Class 10-A: Light Reflection & Ray Diagrams</h4>
              <p class="text-[11px] text-slate-500">Physics Lab 1 • 45 Students</p>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">Completed</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderAdminAdmissionsView() {
    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Student Admissions & CRM (Session 2026-27)</h2>
            <p class="text-xs text-slate-500">Manage incoming admission applications, document verification, and seat allocation for Gorakhpur/Kushinagar students.</p>
          </div>
          <button onclick="openOnboardStudentParentModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5">
            <span>➕ Register Direct Admission</span>
          </button>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Enquiry ID</th>
                <th class="py-3 px-4">Applicant & Parent Details</th>
                <th class="py-3 px-4">Class Applied</th>
                <th class="py-3 px-4">Location / Bus Route</th>
                <th class="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.admissions.map(item => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-4 font-mono font-medium text-slate-800">${item.id}</td>
                  <td class="py-3 px-4">
                    <div class="font-bold text-slate-900">${item.studentName}</div>
                    <div class="text-slate-500 text-[11px]">Father: ${item.parentName} • ${item.phone}</div>
                  </td>
                  <td class="py-3 px-4 font-semibold text-indigo-700">${item.applyingClass}</td>
                  <td class="py-3 px-4 text-slate-600">${item.location}</td>
                  <td class="py-3 px-4">
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold ${item.status === 'Admitted' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
                      ${item.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAdminPayrollView() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Teacher Payroll & Staff Attendance</h2>
            <p class="text-xs text-slate-500">Monthly salary calculation, allowances, EPF deductions, and biometric attendance logs.</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th class="py-3 px-3">Faculty ID</th>
                <th class="py-3 px-3">Teacher Name & Designation</th>
                <th class="py-3 px-3">Attendance</th>
                <th class="py-3 px-3">Basic Pay</th>
                <th class="py-3 px-3 font-bold text-slate-900">Net Salary</th>
                <th class="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.payroll.map(p => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3 px-3 font-mono font-medium text-slate-700">${p.empId}</td>
                  <td class="py-3 px-3">
                    <div class="font-bold text-slate-900">${p.name}</div>
                    <div class="text-[11px] text-slate-500">${p.designation}</div>
                  </td>
                  <td class="py-3 px-3 font-semibold text-emerald-700">${p.attendanceDays}</td>
                  <td class="py-3 px-3">₹${p.basic.toLocaleString('en-IN')}</td>
                  <td class="py-3 px-3 font-bold text-emerald-700 text-sm">₹${p.netPay.toLocaleString('en-IN')}</td>
                  <td class="py-3 px-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      ${p.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderBroadcastCenter() {
    return `
      <div class="space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">Staff Broadcast</span>
              <h2 class="text-xl font-bold text-slate-900">School Notice Dispatch (WhatsApp & SMS)</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Authorized for Staff (Admin, Principal, Teacher, Super Admin) to broadcast official notices to parents.</p>
          </div>
          <button onclick="openNoticeModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5">
            <span>📲 Dispatch New Notice</span>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-slate-900 text-sm">Dispatched School Circulars</h3>
            ${state.data.notices.map(n => `
              <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700">${n.category}</span>
                  <span class="text-xs text-slate-400">${n.date}</span>
                </div>
                <h4 class="font-bold text-slate-900 text-sm">${n.title}</h4>
                <p class="font-hindi text-xs text-slate-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">${n.hindiContent}</p>
                <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                  ${n.channels.map(c => `
                    <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      ✓ ${c}
                    </span>
                  `).join('')}
                  <span class="ml-auto text-emerald-600 font-semibold text-[11px]">${n.deliveredCount}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 class="font-bold text-slate-900 text-sm">WhatsApp & SMS Live Preview</h3>
            <div class="rounded-2xl border border-emerald-300 bg-emerald-50/40 p-4 space-y-3">
              <div class="flex items-center gap-3 border-b border-emerald-200/60 pb-2">
                <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  RPS
                </div>
                <div>
                  <h5 class="font-bold text-xs text-slate-900">Rahav Public School (Official WhatsApp)</h5>
                  <span class="text-[10px] text-emerald-700">Verified Business Account • +91 94520-88910</span>
                </div>
              </div>

              <div class="whatsapp-bubble p-3 text-xs text-slate-800 space-y-2">
                <div class="font-bold text-emerald-900">🔔 शीतकालीन विद्यालय समय परिवर्तन सूचना</div>
                <p class="font-hindi leading-relaxed">
                  अभिभावक महोदय, गोरखपुर-कुशीनगर क्षेत्र में ठंड एवं कोहरे के मद्देनजर 1 दिसम्बर से विद्यालय का समय प्रातः 08:30 बजे से दोपहर 02:00 बजे तक रहेगा। स्कूल बसें 30 मिनट विलंब से संचालित होंगी।
                </p>
                <div class="text-[10px] text-slate-500 text-right">08:15 AM ✓✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // PUBLIC WEBSITE & BANNER STUDIO
  // --------------------------------------------------------------------------
  function renderPublicWebsite() {
    const publicTabs = [
      { id: 'home', label: 'School Home' },
      { id: 'faculty', label: '👩‍🏫 Faculty Showcase (शिक्षक मंडल)' },
      { id: 'admissions_enquiry', label: 'Admission Enquiry (प्रवेश)' },
      { id: 'fee_structure', label: 'Fee Structure' },
      { id: 'banner_generator', label: '🎨 Hindi Banner Studio' },
      { id: 'events', label: 'Events & Gallery' }
    ];

    let subView = '';
    if (state.activeTab === 'home') subView = renderPublicHome();
    else if (state.activeTab === 'faculty') subView = renderPublicFacultyPortfolio();
    else if (state.activeTab === 'admissions_enquiry') subView = renderPublicAdmissionEnquiry();
    else if (state.activeTab === 'fee_structure') subView = renderPublicFeeStructure();
    else if (state.activeTab === 'banner_generator') subView = renderHindiBannerStudio();
    else if (state.activeTab === 'events') subView = renderPublicEvents();

    return `
      <div class="min-h-screen bg-slate-50 flex flex-col">
        <header class="bg-white border-b border-slate-200 sticky top-12 z-30 shadow-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-900 to-indigo-700 flex items-center justify-center text-white font-extrabold text-xl shadow">
                RPS
              </div>
              <div>
                <h1 class="text-lg font-bold text-slate-900 leading-tight">RAHAV PUBLIC SCHOOL</h1>
                <p class="text-xs text-slate-500 font-hindi">राघव पब्लिक स्कूल • गोरखपुर-कुशीनगर (सीबीएसई संबद्ध)</p>
              </div>
            </div>

            <nav class="flex items-center flex-wrap gap-2 text-xs font-semibold">
              ${publicTabs.map(tab => `
                <button onclick="setActiveTab('${tab.id}')" class="px-3 py-1.5 rounded-lg transition-all ${state.activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}">
                  ${tab.label}
                </button>
              `).join('')}
              <button onclick="logout()" class="ml-2 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg shadow-sm">
                Portal Login &rarr;
              </button>
            </nav>
          </div>
        </header>

        <main class="flex-1">${subView}</main>

        <footer class="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs">
          <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 class="font-bold text-white text-sm mb-2">Rahav Public School</h4>
              <p class="text-slate-400 leading-relaxed font-hindi">ज्ञान, अनुशासन एवं अत्याधुनिक डिजिटल शिक्षा का अग्रणी संस्थान। कक्षा नर्सरी से 12वीं तक।</p>
            </div>
            <div>
              <h4 class="font-bold text-white text-sm mb-2">Campus Location</h4>
              <p class="text-slate-400 leading-relaxed">NH-28 Highway, Near Buddha Marg, Gorakhpur-Kushinagar Border, UP - 274403</p>
            </div>
            <div>
              <h4 class="font-bold text-white text-sm mb-2">Helpline</h4>
              <p class="text-slate-400">+91 94520 88910 / +91 91250 44321</p>
            </div>
            <div>
              <h4 class="font-bold text-white text-sm mb-2">Affiliation</h4>
              <p class="text-slate-400">CBSE Affiliation No. 2132984 | Code: 71092</p>
            </div>
          </div>
        </footer>
      </div>
    `;
  }

  function renderPublicHome() {
    return `
      <div>
        <div class="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-16 px-4">
          <div class="max-w-5xl mx-auto text-center space-y-5">
            <span class="inline-block px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide border border-amber-400/30 font-hindi">
              ★ प्रवेश प्रारंभ सत्र 2026-2027 (Pre-Nursery to 12th) ★
            </span>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Empowering Future Leaders with Modern STEM & Cultural Values
            </h2>
            <p class="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-hindi">
              गोरखपुर एवं कुशीनगर का प्रमुख सीबीएसई संबद्ध विद्यालय — वातानुकूलित स्मार्ट कक्षाएं, रोबोटिक्स लैब एवं 100% बोर्ड परिणाम।
            </p>
            <div class="flex flex-wrap justify-center gap-3 pt-3">
              <button onclick="setActiveTab('admissions_enquiry')" class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm shadow-xl transition-all">
                📝 Apply for Admission Online
              </button>
              <button onclick="setActiveTab('fee_structure')" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl text-sm transition-all">
                💰 View Fee Structure
              </button>
              <button onclick="setActiveTab('banner_generator')" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all">
                🎨 Create School Hindi Banner
              </button>
            </div>
          </div>
        </div>

        <!-- Eminent Faculty Showcase Spotlight on Homepage -->
        <div class="bg-white border-y border-slate-200 py-12">
          <div class="max-w-6xl mx-auto px-4 space-y-8">
            <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
              <div>
                <span class="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold font-hindi">
                  ★ हमारे अनुभवी एवं समर्पित शिक्षक मंडल ★
                </span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  Meet Our Eminent Faculty & Academic Mentors
                </h2>
                <p class="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
                  At Rahav Public School, students are mentored by Ph.D. scholars, IIT alumni, and state-awarded educators who combine rigorous CBSE pedagogy with individualized student care.
                </p>
              </div>
              <button onclick="setActiveTab('faculty')" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap">
                <span>View All 8 Faculty Portfolios &rarr;</span>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              ${(state.data.facultyPortfolios || []).slice(0, 4).map(f => `
                <div class="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div class="space-y-3">
                    <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-200">
                      <img src="${f.avatar}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="${f.name}">
                      <span class="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm text-amber-300 text-[10px] font-bold">
                        ${f.experience.split(' ')[0]} Exp
                      </span>
                    </div>
                    <div>
                      <h3 class="font-bold text-sm text-slate-900">${f.name}</h3>
                      <h4 class="font-hindi text-[11px] text-yellow-700 font-semibold">${f.hindiName}</h4>
                      <p class="text-[11px] text-indigo-700 font-semibold mt-0.5">${f.role}</p>
                      <p class="text-[10px] text-slate-500 font-mono mt-1">${f.qualifications}</p>
                    </div>
                  </div>
                  <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span class="text-emerald-700 font-bold text-[10px]">100% CBSE Record</span>
                    <button onclick="openTeacherProfileModal('${f.id}')" class="text-indigo-600 font-bold hover:underline">
                      Profile &rarr;
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="max-w-6xl mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="text-3xl mb-3">🔬</div>
              <h4 class="font-bold text-slate-900 text-base">Atal Tinkering & AI Lab</h4>
              <p class="text-xs text-slate-600 mt-2">Robotics, IoT and coding integrated from 6th class.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="text-3xl mb-3">🚌</div>
              <h4 class="font-bold text-slate-900 text-base">GPS Bus Fleet</h4>
              <p class="text-xs text-slate-600 mt-2">Safe transport for Gorakhpur, Hata, Kushinagar & Kasya.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div class="text-3xl mb-3">🎯</div>
              <h4 class="font-bold text-slate-900 text-base">JEE / NEET Integrated</h4>
              <p class="text-xs text-slate-600 mt-2">Top mentoring for competitive exams right on campus.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  
  // --------------------------------------------------------------------------
  // TEACHER PORTFOLIO & FACULTY SHOWCASE (PUBLIC WEBSITE)
  // --------------------------------------------------------------------------
  window.filterFacultyCategory = function(cat) {
    state.selectedFacultyCategory = cat;
    renderApp();
  };

  window.openTeacherProfileModal = function(teacherId) {
    const faculty = (state.data.facultyPortfolios || []).find(f => f.id === teacherId) || state.data.facultyPortfolios[0];

    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl text-xs space-y-5 text-slate-900 border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b pb-4">
          <div class="flex items-center gap-4">
            <img src="${faculty.avatar}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-md" alt="${faculty.name}">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-extrabold text-lg text-slate-900">${faculty.name}</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">${faculty.department}</span>
              </div>
              <h4 class="font-hindi text-xs text-yellow-700 font-semibold">${faculty.hindiName}</h4>
              <p class="text-xs font-semibold text-slate-600 mt-0.5">${faculty.role}</p>
            </div>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-2xl font-bold">&times;</button>
        </div>

        <!-- Credentials Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Qualifications</span>
            <div class="text-xs font-bold text-slate-900 mt-1">${faculty.qualifications}</div>
          </div>
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Experience</span>
            <div class="text-xs font-bold text-indigo-700 mt-1">${faculty.experience.split(' ')[0]} Years CBSE</div>
          </div>
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
            <span class="text-[10px] font-bold text-slate-500 uppercase">Board Success</span>
            <div class="text-xs font-bold text-emerald-700 mt-1">100% Pass Record</div>
          </div>
        </div>

        <!-- Academic Bio & Philosophy -->
        <div class="space-y-2">
          <h4 class="font-bold text-xs text-slate-900">Academic Background & Mentorship</h4>
          <p class="text-slate-600 leading-relaxed text-xs">${faculty.bio}</p>
          <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 italic text-xs">
            "${faculty.quote}"
          </div>
        </div>

        <!-- Honors & Specialization -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
            <span class="font-bold text-[11px] text-indigo-950">🏆 Key Achievements & Honors</span>
            <p class="text-[11px] text-indigo-900">${faculty.awards}</p>
          </div>
          <div class="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
            <span class="font-bold text-[11px] text-emerald-950">📈 CBSE Board Record</span>
            <p class="text-[11px] text-emerald-900">${faculty.boardRecord}</p>
          </div>
        </div>

        <!-- Teaching Subjects -->
        <div class="space-y-1.5">
          <h4 class="font-bold text-xs text-slate-900">Assigned Teaching Curriculum</h4>
          <div class="flex flex-wrap gap-1.5">
            ${faculty.subjects.map(s => `
              <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                📘 ${s}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-3 border-t flex items-center justify-between text-xs">
          <span class="text-slate-500">Parent-Teacher Interaction: Available on 2nd & 4th Saturdays</span>
          <button onclick="closeModal(); showToast('PTM Appointment requested for ' + '${faculty.name}', 'success');" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow">
            Request PTM Meeting &rarr;
          </button>
        </div>
      </div>
    `;
  };

  function renderPublicFacultyPortfolio() {
    const category = state.selectedFacultyCategory || 'all';
    const allFaculty = state.data.facultyPortfolios || [];
    const filtered = category === 'all' ? allFaculty : allFaculty.filter(f => f.category === category);

    const categories = [
      { id: 'all', label: 'All Faculty (8)' },
      { id: 'science', label: 'Science & Robotics (3)' },
      { id: 'math', label: 'Mathematics (1)' },
      { id: 'languages', label: 'Languages & MUN (1)' },
      { id: 'humanities', label: 'Social Sciences (1)' },
      { id: 'sports', label: 'Sports & Wellness (1)' },
      { id: 'primary', label: 'Primary Wing (1)' }
    ];

    return `
      <div class="bg-slate-50 py-10 px-4 min-h-[calc(100vh-140px)]">
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- Page Header -->
          <div class="text-center max-w-3xl mx-auto space-y-3">
            <span class="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs font-hindi">
              ★ गुणवत्तापूर्ण शिक्षा के स्तंभ • उत्कृष्ट शिक्षक मंडल ★
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Faculty Portfolio & Mentorship Showcase
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every educator at Rahav Public School brings advanced postgraduate qualifications, CBSE board specialization, and a passionate commitment to nurturing academic excellence in Gorakhpur and Kushinagar.
            </p>
          </div>

          <!-- Category Filter Bar -->
          <div class="flex flex-wrap items-center justify-center gap-2 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto text-xs">
            ${categories.map(c => `
              <button onclick="filterFacultyCategory('${c.id}')" class="px-3 py-1.5 rounded-xl font-semibold transition-all ${category === c.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}">
                ${c.label}
              </button>
            `).join('')}
          </div>

          <!-- Faculty Portfolio Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${filtered.map(f => `
              <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4">
                <div class="space-y-4">
                  <!-- Photo Container -->
                  <div class="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <img src="${f.avatar}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${f.name}">
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold">
                      ${f.experience.split(' ')[0]} Years Exp
                    </span>
                    <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold">
                      CBSE Certified
                    </span>
                  </div>

                  <!-- Details -->
                  <div class="space-y-1">
                    <h3 class="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">${f.name}</h3>
                    <h4 class="font-hindi text-xs text-yellow-700 font-semibold">${f.hindiName}</h4>
                    <p class="text-xs text-indigo-700 font-bold">${f.role}</p>
                    <p class="text-[11px] text-slate-500 font-mono pt-1">${f.qualifications}</p>
                  </div>

                  <!-- Board Pass Record Badge -->
                  <div class="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-0.5">
                    <span class="text-[10px] font-bold uppercase text-slate-400">Board Achievement</span>
                    <p class="text-slate-700 font-semibold truncate">${f.boardRecord}</p>
                  </div>

                  <!-- Philosophy Quote -->
                  <p class="text-slate-600 italic text-xs border-l-2 border-indigo-400 pl-2.5 leading-relaxed line-clamp-2">
                    "${f.quote}"
                  </p>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-[11px] text-slate-400">${f.department.split(' ')[0]}</span>
                  <button onclick="openTeacherProfileModal('${f.id}')" class="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 rounded-xl text-xs font-bold transition-all shadow-sm">
                    View Full Profile &rarr;
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderPublicAdmissionEnquiry() {
    return `
      <div class="max-w-4xl mx-auto px-4 py-10">
        <div class="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div class="text-center space-y-2 border-b border-slate-100 pb-5">
            <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-hindi">
              सत्र 2026-2027 ऑनलाइन प्रवेश पंजीकरण
            </span>
            <h2 class="text-2xl font-bold text-slate-900">Student Admission & Enquiry Form</h2>
            <p class="text-xs text-slate-500">Fill the details below. Our admissions counselor will contact you within 24 hours.</p>
          </div>

          <form id="public-admission-form" onsubmit="event.preventDefault(); submitPublicAdmissionForm();" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
                <input id="enq-student" required type="text" placeholder="e.g. Aryan Yadav" class="w-full px-3 py-2 border border-slate-300 rounded-xl">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Applying for Class *</label>
                <select id="enq-class" class="w-full px-3 py-2 border border-slate-300 rounded-xl">
                  <option>Pre-Nursery / Nursery</option>
                  <option>Class 1st to 5th</option>
                  <option>Class 9th</option>
                  <option selected>Class 10th</option>
                  <option>Class 11th (Science PCM/PCB)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Father's / Guardian's Name *</label>
                <input id="enq-parent" required type="text" placeholder="e.g. Suresh Yadav" class="w-full px-3 py-2 border border-slate-300 rounded-xl">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                <input id="enq-phone" required type="tel" placeholder="+91 94520 XXXXX" class="w-full px-3 py-2 border border-slate-300 rounded-xl">
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Residential City / Area *</label>
              <input id="enq-location" required type="text" value="Kushinagar / Kasya" class="w-full px-3 py-2 border border-slate-300 rounded-xl">
            </div>

            <div class="pt-3 flex justify-end">
              <button type="submit" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all">
                Submit Admission Registration &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  window.submitPublicAdmissionForm = function() {
    const student = document.getElementById('enq-student').value;
    const parent = document.getElementById('enq-parent').value;
    const phone = document.getElementById('enq-phone').value;
    const cls = document.getElementById('enq-class').value;
    const loc = document.getElementById('enq-location').value;

    const newEnquiry = {
      id: `ENQ-2027-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: student,
      parentName: parent,
      phone: phone,
      applyingClass: cls,
      location: loc,
      date: "Today",
      status: "New Enquiry",
      entranceTestScore: "Pending"
    };

    state.data.admissions.unshift(newEnquiry);
    showToast(`Admission Enquiry submitted for ${student}! Registered under ID ${newEnquiry.id}`, 'success');
    setActiveTab('home');
  };

  function renderPublicFeeStructure() {
    return `
      <div class="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-bold text-slate-900">Transparent Fee Structure (Session 2026-27)</h2>
          <p class="text-xs text-slate-500">No hidden fees. Full quarterly breakdown with laboratory, sports, and library inclusions.</p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-indigo-50/80 text-indigo-950 font-bold border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Class Group</th>
                <th class="py-3 px-4">One-Time Admission Fee</th>
                <th class="py-3 px-4">Quarterly Tuition</th>
                <th class="py-3 px-4">Annual Composite Charges</th>
                <th class="py-3 px-4">Facilities Included</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.data.publicFeeStructure.map(f => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3.5 px-4 font-bold text-slate-900">${f.classGroup}</td>
                  <td class="py-3.5 px-4 font-semibold text-slate-700">${f.admissionFee}</td>
                  <td class="py-3.5 px-4 font-bold text-emerald-700 text-sm">${f.quarterlyTuition}</td>
                  <td class="py-3.5 px-4 text-slate-600">${f.annualCharges}</td>
                  <td class="py-3.5 px-4 text-slate-500 text-[11px]">${f.facilities}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderHindiBannerStudio() {
    const t = state.bannerCustom;
    return `
      <div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[11px] font-hindi">डिजिटल बैनर मेकर</span>
              <h2 class="text-xl font-bold text-slate-900">School Advertisement & Hindi Banner Studio</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Design localized promotional hoardings, WhatsApp status cards, and admission advertisements for Gorakhpur/Kushinagar.</p>
          </div>
          <button onclick="downloadBanner()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5">
            <span>📥 Export / Download Banner</span>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 class="font-bold text-slate-900 text-sm border-b pb-2">Banner Customization Controls</h3>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Hindi Headline (मुख्य शीर्षक)</label>
              <input id="inp-banner-title" type="text" value="${t.titleHindi}" oninput="updateBannerField('titleHindi', this.value)" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-hindi">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Hindi Subtitle (उप-शीर्षक)</label>
              <input id="inp-banner-sub" type="text" value="${t.subtitleHindi}" oninput="updateBannerField('subtitleHindi', this.value)" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-hindi">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Tagline / Key Highlight</label>
              <input id="inp-banner-tag" type="text" value="${t.tag}" oninput="updateBannerField('tag', this.value)" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-hindi">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Contact Details & Location</label>
              <input id="inp-banner-contact" type="text" value="${t.contactText}" oninput="updateBannerField('contactText', this.value)" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-hindi">
            </div>
          </div>

          <div class="lg:col-span-2 space-y-3">
            <div id="school-live-banner" class="banner-export-preview bg-gradient-to-r ${t.themeColor} text-white p-8 flex flex-col justify-between relative shadow-2xl rounded-2xl border-4 border-amber-400/30">
              <div class="flex items-start justify-between relative z-10 border-b border-white/20 pb-4">
                <div class="flex items-center gap-3">
                  <div class="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white">
                    RPS
                  </div>
                  <div>
                    <h3 class="text-2xl font-black tracking-wide text-amber-300">RAHAV PUBLIC SCHOOL</h3>
                    <p class="text-base font-hindi font-bold text-white tracking-wide">राघव पब्लिक स्कूल • कुशीनगर / गोरखपुर</p>
                    <p class="text-[11px] text-slate-200">CBSE Affiliation No. 2132984 | School Code: 71092</p>
                  </div>
                </div>

                <div class="text-right">
                  <span class="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                    Admissions Open 2026-27
                  </span>
                </div>
              </div>

              <div class="my-4 text-center relative z-10 space-y-2">
                <div class="inline-block px-3 py-0.5 rounded-lg bg-white/20 text-amber-300 text-xs font-semibold font-hindi">
                  ${t.tag}
                </div>
                <h1 class="text-3xl sm:text-4xl font-black font-hindi text-yellow-300 drop-shadow-md leading-tight">
                  ${t.titleHindi}
                </h1>
                <h2 class="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  ${t.titleEnglish}
                </h2>
                <p class="text-sm sm:text-base font-hindi text-slate-200 font-medium">
                  ${t.subtitleHindi}
                </p>
              </div>

              <div class="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between text-xs relative z-10 font-hindi gap-2">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-amber-300">📍 पता:</span>
                  <span class="text-white">${t.contactText}</span>
                </div>
                <div class="text-right font-bold text-yellow-300">
                  🌐 www.rahavpublicschool.edu.in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.updateBannerField = function(field, val) {
    state.bannerCustom[field] = val;
    renderApp();
  };

  window.downloadBanner = function() {
    showToast('Banner Exported in High Resolution PNG for Flex Printing!', 'success');
  };

  function renderPublicEvents() {
    return `
      <div class="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-bold text-slate-900 font-hindi">विद्यालयी कार्यक्रम एवं गतिविधियां (Events)</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${state.data.events.map(ev => `
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div class="p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                <span class="text-xs font-bold text-amber-300">${ev.category}</span>
                <h3 class="font-bold text-base mt-1">${ev.title}</h3>
                <h4 class="font-hindi text-xs text-yellow-300">${ev.hindiTitle}</h4>
              </div>
              <div class="p-4 text-xs space-y-2 text-slate-600">
                <p>📅 Date: <strong>${ev.date}</strong></p>
                <p>📍 Venue: <strong>${ev.venue}</strong></p>
                <p>${ev.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // MOBILE APP SIMULATOR
  // --------------------------------------------------------------------------
  function renderMobileBottomNav(role) {
    const navConfigs = {
      parent: [
        { icon: '🏠', label: 'Home', action: 'showToast(\'Parent Home\', \'info\')' },
        { icon: '📝', label: 'Leave', action: 'openApplyLeaveModal()' },
        { icon: '💳', label: 'Pay Fee', action: 'openPayFeeModal()' },
        { icon: '🗣️', label: 'Grievance', action: 'openLodgeComplaintModal()' }
      ],
      student: [
        { icon: '🏠', label: 'Home', action: 'showToast(\'Student Home\', \'info\')' },
        { icon: '📚', label: 'Homework', action: 'openSubmitHomeworkModal(\'Mathematics\')' },
        { icon: '🗓️', label: 'Timetable', action: 'showToast(\'Daily Schedule: 7 Periods\', \'info\')' },
        { icon: '📊', label: 'Scorecard', action: 'openReportCardModal(\'Aarav Sharma\')' }
      ],
      teacher: [
        { icon: '🏠', label: 'Home', action: 'showToast(\'Teacher Home\', \'info\')' },
        { icon: '📋', label: 'Roll Call', action: 'setActiveTab(\'attendance\'); setViewMode(\'desktop\'); showToast(\'Opening 10-A Roll Call...\', \'success\');' },
        { icon: '📝', label: 'Leaves', action: 'showToast(\'1 Pending Leave Approval\', \'info\')' },
        { icon: '📢', label: 'Notices', action: 'showToast(\'Winter Schedule Active\', \'info\')' }
      ],
      principal: [
        { icon: '🏠', label: 'Pulse', action: 'showToast(\'Campus Pulse: 96% Present\', \'info\')' },
        { icon: '👥', label: 'Faculty', action: 'showToast(\'62/65 Teachers on Duty\', \'info\')' },
        { icon: '⚠️', label: 'Grievance', action: 'showToast(\'Viewing Bus Route 4 grievance\', \'info\')' },
        { icon: '📅', label: 'Exams', action: 'showToast(\'CBSE Datesheet 15 Dec\', \'info\')' }
      ],
      admin: [
        { icon: '🏠', label: 'Home', action: 'showToast(\'Admin Home\', \'info\')' },
        { icon: '💰', label: 'Counter', action: 'setActiveTab(\'fee_collection\'); setViewMode(\'desktop\'); showToast(\'Opening Fee Counter...\', \'info\');' },
        { icon: '📝', label: 'Admit', action: 'openOnboardAccountModal()' },
        { icon: '📄', label: 'Receipts', action: 'showToast(\'Today: 18 fee receipts printed\', \'info\')' }
      ],
      super_admin: [
        { icon: '🏠', label: 'Executive', action: 'showToast(\'Executive Overview: ₹1.82 Cr\', \'info\')' },
        { icon: '📊', label: 'Revenue', action: 'showToast(\'Fee target: 86.6% collected\', \'info\')' },
        { icon: '👥', label: 'Staff', action: 'openOnboardStaffModal()' },
        { icon: '⚖️', label: 'Grievance', action: 'showToast(\'All-School Grievance Review\', \'info\')' }
      ]
    };

    const items = navConfigs[role] || navConfigs.parent;
    return `
      <div class="mobile-bottom-nav">
        ${items.map((item, idx) => `
          <button onclick="${item.action}" class="flex flex-col items-center text-[10px] ${idx === 0 ? 'font-semibold text-indigo-700' : 'text-slate-500 hover:text-indigo-700'}">
            <span class="text-base">${item.icon}</span>
            <span>${item.label}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderMobileAppSimulator() {
    const role = state.mobileRole || 'parent';
    const user = state.data.users[role] || state.data.users.parent;

    const personas = [
      { id: 'parent', label: '👨‍👩‍👦 Parent', badge: 'Fees / Leave' },
      { id: 'student', label: '🎒 Student', badge: 'Exams / HW' },
      { id: 'teacher', label: '👩‍🏫 Teacher', badge: '10-A Roll Call' },
      { id: 'principal', label: '🎓 Principal', badge: 'School Pulse' },
      { id: 'admin', label: '🏢 Admin', badge: 'Fee Counter' },
      { id: 'super_admin', label: '👑 Super Admin', badge: 'Owner KPIs' },
    ];

    return `
      <div class="min-h-[calc(100vh-56px)] bg-slate-900 p-4 md:p-6 flex flex-col items-center justify-center">
        <!-- Role Switcher Ribbon for All 6 Mobile Apps -->
        <div class="mb-5 max-w-2xl w-full bg-slate-800/95 p-3 rounded-2xl border border-slate-700 shadow-xl space-y-2">
          <div class="flex items-center justify-between text-xs border-b border-slate-700 pb-2 px-1">
            <span class="text-slate-300 font-bold flex items-center gap-1.5">
              <span>📱</span> Mobile App Experience for All 6 Roles:
            </span>
            <button onclick="setViewMode('desktop')" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
              &larr; Switch to Desktop Portal
            </button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 text-xs">
            ${personas.map(p => `
              <button onclick="setMobileRole('${p.id}')" class="px-2 py-1.5 rounded-xl flex flex-col items-center text-center transition-all ${state.mobileRole === p.id ? 'bg-indigo-600 text-white font-bold shadow-md ring-2 ring-indigo-400' : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/80 hover:text-white'}">
                <span class="text-xs truncate font-semibold">${p.label}</span>
                <span class="text-[9px] opacity-75">${p.badge}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Phone Bezel Frame -->
        <div class="mobile-device-frame">
          <div class="mobile-notch">
            <div class="mobile-speaker"></div>
            <div class="mobile-camera"></div>
          </div>

          <div class="mobile-screen-content">
            <div class="px-4 pt-3 pb-3 bg-indigo-900 text-white shadow-md flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <img src="${user.avatar}" class="w-8 h-8 rounded-full object-cover ring-2 ring-amber-400" alt="Avatar">
                <div>
                  <h4 class="text-xs font-bold leading-tight">${user.name}</h4>
                  <p class="text-[10px] text-amber-300 font-hindi">राघव पब्लिक स्कूल • ${role.replace('_', ' ').toUpperCase()}</p>
                </div>
              </div>
              <button onclick="logout()" class="text-[10px] bg-red-600/80 hover:bg-red-600 text-white px-2 py-0.5 rounded font-semibold">
                Exit
              </button>
            </div>

            <div class="p-3.5 space-y-3.5">
              ${renderMobilePersonaContent(role)}
            </div>
          </div>

          ${renderMobileBottomNav(role)}
        </div>
      </div>
    `;
  }

  function renderMobilePersonaContent(role) {
    if (role === 'parent') {
      return `
        <!-- Fee Alert Card -->
        <div class="bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl p-4 text-white shadow-md">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-red-100">Fee Alert • Quarter 3</span>
          <div class="flex items-baseline justify-between mt-1">
            <h3 class="text-xl font-bold">₹${state.data.feeDetails.currentDue.toLocaleString('en-IN')} Due</h3>
            <span class="text-[11px] text-red-100">By 15 Dec</span>
          </div>
          <p class="text-[11px] text-red-100 mt-1">Aarav Sharma (Class 10-A, Roll 14)</p>
          <button onclick="openPayFeeModal()" class="w-full mt-3 py-2 bg-white text-red-700 font-bold text-xs rounded-xl shadow hover:bg-red-50">
            Pay Now via UPI (GPay / PhonePe)
          </button>
        </div>

        <!-- CCTV & Bus Quick Action Tiles -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <button onclick="openCCTVModal('cam_10a_rear')" class="bg-gradient-to-br from-rose-950 to-slate-900 text-white p-3 rounded-xl shadow-md border border-rose-600/40 text-center hover:border-rose-400 transition-all">
            <span class="text-lg">🎥</span>
            <div class="font-bold mt-1 text-rose-200">Class 10-A CCTV</div>
            <span class="text-[10px] text-rose-300">Live Desk View</span>
          </button>
          <button onclick="openBusTrackingModal('BUS-04')" class="bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-3 rounded-xl shadow-md border border-indigo-600/40 text-center hover:border-indigo-400 transition-all">
            <span class="text-lg">🚌</span>
            <div class="font-bold mt-1 text-indigo-200">Track Bus 04</div>
            <span class="text-[10px] text-indigo-300">ETA 14 Mins</span>
          </button>
        </div>

        <!-- 2 Action Tiles -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <button onclick="openApplyLeaveModal()" class="bg-emerald-50 hover:bg-emerald-100 p-3 rounded-xl border border-emerald-200 text-center transition-all">
            <span class="text-lg">📝</span>
            <div class="font-bold text-emerald-900 mt-1">Apply Leave</div>
            <span class="text-[10px] text-emerald-600">For Aarav</span>
          </button>
          <button onclick="openLodgeComplaintModal()" class="bg-amber-50 hover:bg-amber-100 p-3 rounded-xl border border-amber-200 text-center transition-all">
            <span class="text-lg">🗣️</span>
            <div class="font-bold text-amber-900 mt-1">Grievance</div>
            <span class="text-[10px] text-amber-600">Bus / Academic</span>
          </button>
        </div>

        <!-- Student Progress Snapshot -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-900">Child Attendance & Rank</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">92.4% Present</span>
          </div>
          <p class="text-[11px] text-slate-500">Aarav is ranked <strong>4th</strong> in Class 10-A. Eligible for CBSE Board Exams.</p>
        </div>

        <!-- Official Notice Received (Read Only) -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-900">Official Notice Received</span>
            <span class="text-[10px] text-emerald-600 font-semibold">Read Only</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-hindi leading-relaxed">
            शीतकालीन समय: 1 दिसम्बर से विद्यालय 8:30 बजे से संचालित होगा।
          </div>
        </div>
      `;
    } else if (role === 'teacher') {
      return `
        <!-- Class Teacher Roll Call Card -->
        <div class="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-4 text-white shadow-md">
          <span class="text-[10px] font-semibold text-emerald-200">Class Teacher: 10-A In-Charge</span>
          <h3 class="text-lg font-bold mt-1">Morning Roll Call (38 Students)</h3>
          <p class="text-[11px] text-emerald-100 mt-0.5">35 Present • 2 Absent • 1 Leave</p>
          <button onclick="setActiveTab('attendance'); setViewMode('desktop'); showToast('Opening Class 10-A Attendance Sheet...', 'success')" class="w-full mt-3 py-1.5 bg-white text-emerald-950 rounded-lg text-xs font-bold hover:bg-emerald-50 shadow">
            Open Roll Call (P/A/L Table) &rarr;
          </button>
        </div>

        <!-- Pending Leave Request -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs">
            <h4 class="font-bold text-slate-900">Pending Student Leave (1)</h4>
            <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Action Needed</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
            <div>
              <strong>Aarav Sharma (Roll 14)</strong>
              <p class="text-[11px] text-slate-500">28-30 Nov (Family Wedding)</p>
            </div>
            <button onclick="approveLeave('LEV-2026-089')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold shadow">
              Approve
            </button>
          </div>
        </div>

        <!-- Today's Schedule -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h4 class="font-bold text-xs text-slate-900">Today's Teaching Classes</h4>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between p-2 rounded-lg bg-blue-50 text-blue-900 font-medium">
              <span>Period 1: Class 10-A</span>
              <span class="text-[11px]">Math (Room 204)</span>
            </div>
            <div class="flex justify-between p-2 rounded-lg bg-slate-50 text-slate-700">
              <span>Period 3: Class 9-B</span>
              <span class="text-[11px]">Math (Room 102)</span>
            </div>
          </div>
        </div>
      `;
    } else if (role === 'student') {
      return `
        <!-- Current Schedule Card -->
        <div class="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl p-4 text-white shadow-md">
          <span class="text-[10px] font-semibold text-amber-300">Class 10th - Section A</span>
          <h3 class="text-lg font-bold mt-1">Next: Period 1 Mathematics</h3>
          <p class="text-[11px] text-slate-300 mt-0.5">Mrs. Sunita Verma • Room 204</p>
        </div>

        <!-- Homework To-Do -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs">
            <h4 class="font-bold text-slate-900">Homework Pending</h4>
            <span class="text-[10px] text-red-600 font-bold">Due Tomorrow</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div class="font-bold text-slate-800">Quadratic Equations Ex 4.3</div>
            <p class="text-[11px] text-slate-500 mt-0.5">Complete Q1 to Q10 with all working steps.</p>
            <button onclick="openSubmitHomeworkModal('Quadratic Equations')" class="w-full mt-2 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-semibold shadow">
              Upload Solution File
            </button>
          </div>
        </div>

        <!-- Scorecard Snapshot -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-900">Term-1 Exam Scorecard</span>
            <span class="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">92.8% (A1)</span>
          </div>
          <button onclick="openReportCardModal('Aarav Sharma')" class="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs shadow">
            View Official CBSE Marksheet &rarr;
          </button>
        </div>
      `;
    } else if (role === 'principal') {
      return `
        <!-- Campus Real-Time Pulse -->
        <div class="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-4 text-white shadow-md">
          <span class="text-[10px] font-semibold text-amber-300">Campus Daily Pulse</span>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div class="bg-white/10 p-2.5 rounded-xl text-center">
              <div class="text-lg font-black text-emerald-400">96%</div>
              <div class="text-[10px] text-slate-200">Students (1,420/1,480)</div>
            </div>
            <div class="bg-white/10 p-2.5 rounded-xl text-center">
              <div class="text-lg font-black text-amber-400">62 / 65</div>
              <div class="text-[10px] text-slate-200">Faculty On Duty</div>
            </div>
          </div>
        </div>

        <!-- Urgent Escalated Grievance -->
        <div class="bg-white p-3.5 rounded-2xl border border-red-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs">
            <h4 class="font-bold text-red-900 flex items-center gap-1.5">
              <span>🚨</span> Urgent Parent Grievance
            </h4>
            <span class="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">High Priority</span>
          </div>
          <p class="text-xs text-slate-700"><strong>Bus Route 4 Delayed:</strong> Near Gorakhpur Bypass due to fog. 14 parents notified.</p>
          <div class="flex gap-2 pt-1">
            <button onclick="showToast('Calling Transport Manager Virendra (98390-12345)...', 'info')" class="flex-1 py-1.5 bg-blue-600 text-white rounded text-[10px] font-bold">
              Call Transport
            </button>
            <button onclick="showToast('Marked Grievance Resolved', 'success')" class="flex-1 py-1.5 bg-emerald-600 text-white rounded text-[10px] font-bold">
              Resolve
            </button>
          </div>
        </div>

        <!-- Exam & Teaching Info -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h4 class="font-bold text-xs text-slate-900">Academic In-Charge</h4>
          <p class="text-xs text-slate-600">CBSE Half-Yearly Exam commencing <strong>15 Dec 2026</strong>. 8 faculty invigilation duties assigned.</p>
          <div class="p-2 bg-indigo-50 text-indigo-900 rounded-lg text-xs font-medium">
            My Teaching Class: Today Period 2 • Class 12-A Physics (Optics)
          </div>
        </div>
      `;
    } else if (role === 'admin') {
      return `
        <!-- Today's Fee Counter Summary -->
        <div class="bg-gradient-to-r from-emerald-800 to-indigo-900 rounded-2xl p-4 text-white shadow-md">
          <span class="text-[10px] font-semibold text-emerald-200">Fee Counter • 24 Nov 2026</span>
          <h3 class="text-xl font-black mt-1">₹84,500 Collected</h3>
          <p class="text-[11px] text-emerald-100 mt-0.5">Cash: ₹32,000 • UPI: ₹45,500 • POS: ₹7,000</p>
          <button onclick="setActiveTab('fee_collection'); setViewMode('desktop'); showToast('Opening Counter in Desktop...', 'info')" class="w-full mt-3 py-1.5 bg-white text-indigo-950 font-bold rounded-lg text-xs shadow hover:bg-slate-50">
            Open Collection Counter &rarr;
          </button>
        </div>

        <!-- Admission Desk -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs">
            <h4 class="font-bold text-slate-900">Admissions Desk</h4>
            <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">3 Pending</span>
          </div>
          <p class="text-xs text-slate-600">3 new admission enquiries received from Kushinagar & Deoria road.</p>
          <button onclick="openOnboardAccountModal()" class="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow">
            + Onboard New Student & Parent
          </button>
        </div>

        <!-- Counter Receipts Printed -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
          <div class="flex justify-between items-center">
            <span class="font-bold text-slate-900">Recent Slips Issued</span>
            <span class="text-slate-500">18 Receipts</span>
          </div>
          <p class="text-slate-600">Last slip: <strong>REC-2026-1049</strong> (₹12,500 via PhonePe QR)</p>
        </div>
      `;
    } else {
      // Super Admin
      return `
        <!-- Super Admin Financial & Campus Pulse -->
        <div class="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-2xl p-4 text-white shadow-md">
          <span class="text-[10px] font-semibold text-purple-200">Super Admin (Owner) Portal</span>
          <h3 class="text-xl font-black mt-1">₹1.82 Cr / ₹2.10 Cr</h3>
          <p class="text-[11px] text-purple-200 mt-0.5">86.6% Fee Target Achieved • 1,480 Enrolled</p>
          <button onclick="openOnboardStaffModal()" class="w-full mt-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg text-xs shadow">
            + Onboard Faculty / Staff Role
          </button>
        </div>

        <!-- Super Admin Surveillance & Fleet Quick Tiles -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <button onclick="openCCTVModal('all')" class="bg-gradient-to-br from-rose-950 to-slate-900 text-white p-3 rounded-xl shadow-md border border-rose-600/40 text-center hover:border-rose-400 transition-all">
            <span class="text-lg">🎥</span>
            <div class="font-bold mt-1 text-rose-200">CCTV Wall</div>
            <span class="text-[10px] text-rose-300">8 Campus Cams</span>
          </button>
          <button onclick="openBusTrackingModal('all')" class="bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-3 rounded-xl shadow-md border border-indigo-600/40 text-center hover:border-indigo-400 transition-all">
            <span class="text-lg">🚌</span>
            <div class="font-bold mt-1 text-indigo-200">Fleet GPS</div>
            <span class="text-[10px] text-indigo-300">7 Active Buses</span>
          </button>
        </div>

        <!-- Payroll Clearance Card -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between text-xs">
            <h4 class="font-bold text-slate-900">Monthly Staff Payroll</h4>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Disbursed</span>
          </div>
          <p class="text-xs text-slate-600">November 2026 Payroll: <strong>₹14.85 Lakhs</strong> successfully cleared for 65 staff members.</p>
        </div>

        <!-- Governance & Grievances -->
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
          <div class="flex justify-between items-center">
            <span class="font-bold text-slate-900">All-School Grievance Status</span>
            <span class="text-emerald-600 font-bold">12 Resolved / 4 Active</span>
          </div>
          <p class="text-slate-600">Executive oversight on transport, academic grievances, and CBSE compliance.</p>
        </div>
      `;
    }
  }


  // --------------------------------------------------------------------------
  // PAY FEE, RECEIPT & REPORT CARD MODALS
  // --------------------------------------------------------------------------
  window.openPayFeeModal = function() {
    const fee = state.data.feeDetails;
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base">₹</div>
            <div>
              <h3 class="font-bold text-base text-slate-900">School Fee Online Payment</h3>
              <p class="text-[11px] text-slate-500">Rahav Public School, Gorakhpur-Kushinagar</p>
            </div>
          </div>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="bg-slate-50 p-3.5 rounded-xl space-y-1.5 border border-slate-200">
          <div class="flex justify-between">
            <span class="text-slate-500">Student Name:</span>
            <strong class="text-slate-900">${fee.studentName} (Class 10-A)</strong>
          </div>
          <div class="flex justify-between font-bold text-sm text-slate-900 border-t pt-1.5">
            <span>Amount Due:</span>
            <span class="text-red-600">₹${fee.currentDue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div class="text-center p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
          <div class="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
            <div class="text-center">
              <div class="text-3xl">📱</div>
              <p class="text-[10px] text-slate-500 mt-1">UPI QR Code</p>
              <p class="text-[9px] font-mono text-indigo-700">rahavpublic@sbi</p>
            </div>
          </div>
          <p class="text-[11px] text-slate-600 font-medium">Scan with Google Pay, PhonePe, Paytm, or BHIM</p>
        </div>

        <div class="space-y-2">
          <button onclick="simulateSuccessfulPayment()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <span>✓ Complete Payment of ₹${fee.currentDue.toLocaleString('en-IN')} (Simulate)</span>
          </button>
        </div>
      </div>
    `;
  };

  window.simulateSuccessfulPayment = function() {
    const fee = state.data.feeDetails;
    fee.totalPaid += fee.currentDue;
    fee.currentDue = 0;
    fee.status = "Fully Cleared";
    
    const receiptNo = `RPS/REC/2026/10${Math.floor(10 + Math.random() * 89)}`;
    fee.history.unshift({
      receiptNo: receiptNo,
      date: "Today",
      amount: 12500,
      term: "Quarter 3 Fee & Bus (Paid)",
      mode: "UPI (Google Pay)",
      status: "Paid",
      downloadUrl: `#receipt-${receiptNo}`
    });

    closeModal();
    renderApp();
    showToast(`Payment Successful! Receipt ${receiptNo} Generated`, 'success');
    openReceiptModal(receiptNo, '12,500', 'Today');
  };

  window.openReceiptModal = function(receiptNo, amount, date) {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <span class="font-bold text-emerald-700 text-sm">Official Fee Receipt</span>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="p-6 border-2 border-slate-800 rounded-2xl bg-white space-y-4 relative">
          <div class="text-center border-b pb-3">
            <h3 class="font-extrabold text-base text-slate-900">RAHAV PUBLIC SCHOOL</h3>
            <p class="text-[10px] text-slate-600 font-hindi">राघव पब्लिक स्कूल • गोरखपुर-कुशीनगर राष्ट्रीय राजमार्ग 28</p>
            <p class="text-[10px] text-slate-500">CBSE Affiliation No. 2132984 | accounts@rahavpublicschool.edu.in</p>
            <div class="inline-block mt-1 px-3 py-0.5 rounded bg-slate-100 font-bold text-[10px]">FEE PAYMENT RECEIPT</div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[11px]">
            <div>Receipt No: <strong class="font-mono text-slate-900">${receiptNo}</strong></div>
            <div>Date: <strong class="text-slate-900">${date}</strong></div>
            <div>Student Name: <strong class="text-slate-900">Aarav Sharma</strong></div>
            <div>Class: <strong class="text-slate-900">10th - Section A</strong></div>
          </div>

          <div class="border-t border-b border-slate-200 py-2 space-y-1 text-[11px]">
            <div class="flex justify-between"><span>Quarter 3 Tuition Fee</span><span>₹8,000.00</span></div>
            <div class="flex justify-between"><span>Bus Transport (Gorakhpur Route)</span><span>₹2,000.00</span></div>
            <div class="flex justify-between font-bold border-t pt-1 text-xs">
              <span>Total Received:</span>
              <span class="text-emerald-800">₹${amount}</span>
            </div>
          </div>

          <div class="pt-4 flex justify-between items-end text-[10px] text-slate-500">
            <div>Generated digitally via Cloud ERP</div>
            <div class="text-center font-serif">
              <span class="font-bold text-slate-800 italic">Anand Mishra</span>
              <div class="border-t border-slate-400 mt-1">Authorized Accounts Officer</div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button onclick="window.print()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold">
            🖨️ Print Receipt
          </button>
          <button onclick="closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium">
            Close
          </button>
        </div>
      </div>
    `;
  };

  window.openMarksheetModal = function() {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    const res = state.data.examResults;
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs my-8">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-slate-900 text-sm">Official Report Card / Marksheet (CBSE Format)</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>

        <div class="cbse-marksheet-sheet p-6 rounded-xl space-y-4">
          <div class="cbse-watermark font-hindi">राघव पब्लिक स्कूल</div>

          <div class="text-center border-b-2 border-indigo-900 pb-3">
            <h2 class="text-xl font-black text-indigo-950">RAHAV PUBLIC SCHOOL</h2>
            <p class="font-hindi text-slate-700 font-bold">राघव पब्लिक स्कूल • गोरखपुर-कुशीनगर मार्ग (उत्तर प्रदेश)</p>
            <p class="text-[10px] text-slate-500">Affiliated to Central Board of Secondary Education (CBSE), New Delhi</p>
            <div class="mt-2 inline-block px-4 py-0.5 rounded bg-indigo-900 text-white font-bold text-[11px] uppercase tracking-wider">
              ${res.term}
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px]">
            <div>Student Name: <strong class="text-slate-900">${res.studentName}</strong></div>
            <div>Class & Sec: <strong class="text-slate-900">${res.class}</strong></div>
            <div>Roll No: <strong class="text-slate-900">${res.rollNo}</strong></div>
            <div>Class Rank: <strong class="text-emerald-700">${res.rank}</strong></div>
          </div>

          <table class="w-full text-left text-xs border border-slate-300">
            <thead class="bg-indigo-50 font-bold text-indigo-950 border-b border-slate-300">
              <tr>
                <th class="py-2 px-3">Subject Name</th>
                <th class="py-2 px-3">Theory (80)</th>
                <th class="py-2 px-3">Practical (20)</th>
                <th class="py-2 px-3">Total (100)</th>
                <th class="py-2 px-3">Grade</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${res.subjects.map(s => `
                <tr>
                  <td class="py-2 px-3 font-semibold">${s.name}</td>
                  <td class="py-2 px-3">${s.theory}</td>
                  <td class="py-2 px-3">${s.practical}</td>
                  <td class="py-2 px-3 font-bold text-indigo-700">${s.total}</td>
                  <td class="py-2 px-3 font-bold text-emerald-700">${s.grade}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="p-3 bg-slate-50 rounded-lg border text-[11px] space-y-1">
            <div>Remarks: <strong class="text-slate-800">${res.remarks}</strong></div>
            <div class="flex justify-between font-bold text-slate-900 pt-1 border-t">
              <span>Overall Aggregate: ${res.overallPercentage}</span>
              <span class="text-emerald-700">Final Grade: ${res.overallGrade}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button onclick="window.print()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold">
            🖨️ Print Marksheet
          </button>
          <button onclick="closeModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium">
            Close
          </button>
        </div>
      </div>
    `;
  };

  window.openNoticeModal = function() {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Dispatch Notice to Parents & Teachers</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Notice Title</label>
            <input id="notice-title" type="text" value="School Winter Schedule & Bus Timing" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Hindi Content</label>
            <textarea id="notice-hindi" rows="3" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-hindi">अभिभावक महोदय, गोरखपुर-कुशीनगर में ठंड एवं कोहरे के मद्देनजर विद्यालय 1 दिसम्बर से प्रातः 08:30 बजे से संचालित होगा।</textarea>
          </div>
        </div>
        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="dispatchNotice()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow">
            Send Broadcast via WhatsApp & SMS
          </button>
        </div>
      </div>
    `;
  };

  window.dispatchNotice = function() {
    const title = document.getElementById('notice-title').value;
    const hindi = document.getElementById('notice-hindi').value;

    state.data.notices.unshift({
      id: `not_${Date.now()}`,
      title: title,
      hindiTitle: title,
      category: "Staff Notice",
      date: "Today",
      audience: "All Parents",
      channels: ["WhatsApp Broadcast", "SMS", "Mobile Push"],
      content: title,
      hindiContent: hindi,
      sentBy: state.data.users[state.currentRole].name,
      deliveredCount: "1,412 Delivered",
      whatsappStatus: "Read 96%"
    });

    closeModal();
    renderApp();
    showToast(`Notice broadcasted to parents!`, 'whatsapp');
  };

  window.openAssignHomeworkModal = function(defaultSubject = "Mathematics") {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Assign New Homework</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Subject</label>
            <input id="hw-sub" type="text" value="${defaultSubject}" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Homework Topic</label>
            <input id="hw-title" type="text" placeholder="e.g. Chapter 4 Quadratic Formula" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Due Date</label>
            <input id="hw-date" type="date" value="2026-11-28" class="w-full px-3 py-1.5 border border-slate-300 rounded-lg">
          </div>
        </div>
        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="submitNewHomework()" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow">
            Assign Homework
          </button>
        </div>
      </div>
    `;
  };

  window.submitNewHomework = function() {
    const sub = document.getElementById('hw-sub').value;
    const title = document.getElementById('hw-title').value || "Exercise Problems";
    const due = document.getElementById('hw-date').value;

    state.data.homeworkList.unshift({
      id: `hw_${Date.now()}`,
      subject: sub,
      teacher: state.data.users[state.currentRole].name,
      title: title,
      description: "Solve assigned exercise questions.",
      assignedDate: "Today",
      dueDate: due,
      status: "Pending",
      hasAttachment: false,
      maxMarks: 10
    });

    closeModal();
    renderApp();
    showToast(`Assigned homework for ${sub}!`, 'success');
  };

  window.openSubmitHomeworkModal = function(title) {
    let modal = document.getElementById('app-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'app-modal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="font-bold text-sm text-slate-900">Upload Homework Solution</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
        </div>
        <p class="font-semibold text-slate-800">${title}</p>
        <div class="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-2 bg-slate-50">
          <span class="text-3xl">📄</span>
          <p class="font-semibold text-slate-700">Choose PDF or Photo</p>
        </div>
        <div class="pt-3 flex justify-end gap-2 border-t">
          <button onclick="finishHomeworkSubmission('${title}')" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow">
            Confirm & Upload
          </button>
        </div>
      </div>
    `;
  };

  window.finishHomeworkSubmission = function(title) {
    const hw = state.data.homeworkList.find(h => h.title.includes(title) || title.includes(h.title));
    if (hw) {
      hw.status = "Submitted";
      hw.submittedDate = "Just Now";
    }
    closeModal();
    renderApp();
    showToast(`Homework uploaded for ${title}!`, 'success');
  };

  // --------------------------------------------------------------------------
  // MASTER RENDER CONTROLLER
  // --------------------------------------------------------------------------
  function renderApp() {
    // If not logged in, show Login Portal asking for role!
    if (!state.isLoggedIn) {
      appContainer.innerHTML = renderLoginPortal();
      return;
    }

    let mainViewHtml = '';

    if (state.viewMode === 'mobile') {
      mainViewHtml = renderMobileAppSimulator();
    } else {
      if (state.currentRole === 'super_admin') {
        mainViewHtml = renderSuperAdminDashboard();
      } else if (state.currentRole === 'admin') {
        mainViewHtml = renderAdminDashboard();
      } else if (state.currentRole === 'principal') {
        mainViewHtml = renderPrincipalDashboard();
      } else if (state.currentRole === 'teacher') {
        mainViewHtml = renderTeacherDashboard();
      } else if (state.currentRole === 'subject_teacher') {
        mainViewHtml = renderSubjectTeacherDashboard();
      } else if (state.currentRole === 'parent') {
        mainViewHtml = renderParentDashboard();
      } else if (state.currentRole === 'student') {
        mainViewHtml = renderStudentDashboard();
      } else if (state.currentRole === 'public') {
        mainViewHtml = renderPublicWebsite();
      }
    }

    appContainer.innerHTML = `
      ${renderDemoBar()}
      ${mainViewHtml}
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderApp();
  });

})();
