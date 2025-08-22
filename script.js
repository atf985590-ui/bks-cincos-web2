document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل بعد 3 ثواني
    setTimeout(() => {
        document.querySelector('.splash-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.splash-screen').style.display = 'none';
        }, 500);
    }, 3000);

    // تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.querySelector('.login-container');
    const mainContainer = document.querySelector('.main-container');
    const welcomeModal = document.querySelector('.welcome-modal');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginContainer.style.display = 'none';
            mainContainer.style.display = 'flex';
            
            // إنشاء المحتوى الديناميكي
            createContentSections();
            
            // عرض رسالة الترحيب بعد تسجيل الدخول
            setTimeout(() => {
                welcomeModal.style.display = 'flex';
            }, 500);
        });
    }
    
    // إغلاق رسالة الترحيب
    const okBtn = document.querySelector('.ok-btn');
    if (okBtn) {
        okBtn.addEventListener('click', function() {
            welcomeModal.style.display = 'none';
        });
    }
    
    // إدارة التنقل بين الأقسام
    function setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const contentSections = document.querySelectorAll('.content-section');
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                
                // إزالة النشاط من جميع العناصر
                navItems.forEach(navItem => navItem.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // إضافة النشاط للعنصر الحالي
                this.classList.add('active');
                
                // عرض القسم المحدد
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // نوافذ الإيداع والسحب
    const depositBtn = document.querySelector('.deposit-btn');
    const withdrawBtn = document.querySelector('.withdraw-btn');
    const depositModal = document.querySelector('.deposit-modal');
    const withdrawModal = document.querySelector('.withdraw-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    
    if (depositBtn) {
        depositBtn.addEventListener('click', function() {
            depositModal.style.display = 'flex';
        });
    }
    
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', function() {
            withdrawModal.style.display = 'flex';
        });
    }
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            depositModal.style.display = 'none';
            withdrawModal.style.display = 'none';
        });
    });
    
    // إغلاق النوافذ عند النقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target === depositModal) {
            depositModal.style.display = 'none';
        }
        if (e.target === withdrawModal) {
            withdrawModal.style.display = 'none';
        }
        if (e.target === welcomeModal) {
            welcomeModal.style.display = 'none';
        }
    });
    
    // نسخ عناوين المحافظ
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            navigator.clipboard.writeText(address).then(() => {
                const originalText = this.textContent;
                this.textContent = 'تم النسخ!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
    
    // تغيير مبالغ السحب العشوائية
    function updateRandomAmounts() {
        const amounts = document.querySelectorAll('.amount');
        amounts.forEach(amount => {
            const randomAmount = Math.floor(Math.random() * 100) + 10;
            amount.textContent = randomAmount;
        });
    }
    
    setInterval(updateRandomAmounts, 5000);
    
    // تحريك البنر الدعائي
    const promoSlides = document.querySelectorAll('.promo-slide');
    let currentSlide = 0;
    
    function rotatePromoSlides() {
        promoSlides.forEach(slide => slide.classList.remove('active'));
        promoSlides[currentSlide].classList.add('active');
        currentSlide = (currentSlide + 1) % promoSlides.length;
    }
    
    setInterval(rotatePromoSlides, 4000);
    
    // إنشاء محتوى الأقسام ديناميكيًا
    function createContentSections() {
        createHomeContent();
        createVipContent();
        createInviteContent();
        createTasksContent();
        createProfileContent();
        setupNavigation();
        setupWithdrawMethods();
    }
    
    function createHomeContent() {
        const homeSection = document.createElement('div');
        homeSection.id = 'home';
        homeSection.className = 'content-section active';
        homeSection.innerHTML = `
            <div class="section-header">
                <h2>الرئيسية</h2>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-wallet"></i>
                    <h3>رصيدك</h3>
                    <p>0.00 $</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-coins"></i>
                    <h3>أرباح اليوم</h3>
                    <p>0.00 $</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <h3>أعضاء فريقك</h3>
                    <p>0</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-gift"></i>
                    <h3>مكافآت waiting</h3>
                    <p>0.00 $</p>
                </div>
            </div>
            <div class="quick-actions">
                <h3>إجراءات سريعة</h3>
                <div class="actions-grid">
                    <div class="action-btn">
                        <i class="fas fa-tasks"></i>
                        <span>المهام اليومية</span>
                    </div>
                    <div class="action-btn">
                        <i class="fas fa-crown"></i>
                        <span>ترقية VIP</span>
                    </div>
                    <div class="action-btn">
                        <i class="fas fa-share-alt"></i>
                        <span>دعوة أصدقاء</span>
                    </div>
                    <div class="action-btn">
                        <i class="fas fa-question-circle"></i>
                        <span>الدعم الفني</span>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(homeSection);
    }
    
    function createVipContent() {
        const vipSection = document.createElement('div');
        vipSection.id = 'vip';
        vipSection.className = 'content-section';
        vipSection.innerHTML = `
            <div class="section-header">
                <h2>خطط VIP</h2>
                <p>اختر الخطة المناسبة لتبدأ رحلة أرباحك</p>
            </div>
            <div class="vip-scroll">
                <div class="vip-plans">
                    <!-- سيتم إضافة خطط VIP هنا -->
                </div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(vipSection);
        
        // إضافة خطط VIP (20 خطة)
        const vipPlansContainer = vipSection.querySelector('.vip-plans');
        const vipPlans = [
            { level: 1, price: 5, dailyProfit: '0.70$', friendProfit: '1.00$', taskBonus: '0.70$', loginBonus: '0.00$' },
            { level: 2, price: 8, dailyProfit: '0.90$', friendProfit: '1.10$', taskBonus: '0.90$', loginBonus: '1.00$' },
            { level: 3, price: 12, dailyProfit: '1.00$', friendProfit: '1.20$', taskBonus: '1.00$', loginBonus: '1.20$' },
            { level: 4, price: 17, dailyProfit: '1.20$', friendProfit: '1.40$', taskBonus: '1.20$', loginBonus: '1.40$' },
            { level: 5, price: 23, dailyProfit: '1.50$', friendProfit: '1.70$', taskBonus: '1.50$', loginBonus: '1.70$' },
            { level: 6, price: 30, dailyProfit: '1.80$', friendProfit: '2.00$', taskBonus: '1.80$', loginBonus: '2.00$' },
            { level: 7, price: 38, dailyProfit: '2.10$', friendProfit: '2.30$', taskBonus: '2.10$', loginBonus: '2.30$' },
            { level: 8, price: 47, dailyProfit: '2.50$', friendProfit: '2.70$', taskBonus: '2.50$', loginBonus: '2.70$' },
            { level: 9, price: 57, dailyProfit: '2.90$', friendProfit: '3.10$', taskBonus: '2.90$', loginBonus: '3.10$' },
            { level: 10, price: 68, dailyProfit: '3.30$', friendProfit: '3.50$', taskBonus: '3.30$', loginBonus: '3.50$' },
            { level: 11, price: 80, dailyProfit: '3.80$', friendProfit: '4.00$', taskBonus: '3.80$', loginBonus: '4.00$' },
            { level: 12, price: 93, dailyProfit: '4.30$', friendProfit: '4.50$', taskBonus: '4.30$', loginBonus: '4.50$' },
            { level: 13, price: 107, dailyProfit: '4.80$', friendProfit: '5.00$', taskBonus: '4.80$', loginBonus: '5.00$' },
            { level: 14, price: 122, dailyProfit: '5.40$', friendProfit: '5.60$', taskBonus: '5.40$', loginBonus: '5.60$' },
            { level: 15, price: 138, dailyProfit: '6.00$', friendProfit: '6.20$', taskBonus: '6.00$', loginBonus: '6.20$' },
            { level: 16, price: 155, dailyProfit: '6.70$', friendProfit: '6.90$', taskBonus: '6.70$', loginBonus: '6.90$' },
            { level: 17, price: 173, dailyProfit: '7.40$', friendProfit: '7.60$', taskBonus: '7.40$', loginBonus: '7.60$' },
            { level: 18, price: 192, dailyProfit: '8.20$', friendProfit: '8.40$', taskBonus: '8.20$', loginBonus: '8.40$' },
            { level: 19, price: 212, dailyProfit: '9.00$', friendProfit: '9.20$', taskBonus: '9.00$', loginBonus: '9.20$' },
            { level: 20, price: 250, dailyProfit: '10.00$', friendProfit: '10.20$', taskBonus: '10.00$', loginBonus: '10.20$' }
        ];
        
        vipPlans.forEach(plan => {
            const planElement = document.createElement('div');
            planElement.className = 'vip-plan';
            planElement.innerHTML = `
                <div class="plan-header">
                    <h3>VIP ${plan.level}</h3>
                </div>
                <div class="plan-details">
                    <p>سعر الخطة: $${plan.price}</p>
                    <p>الربح اليومي: ${plan.dailyProfit}</p>
                    <p>ربح دعوة صديق: ${plan.friendProfit}</p>
                    <p>مكافأة إكمال المهام: ${plan.taskBonus}</p>
                    ${plan.loginBonus !== '0.00$' ? `<p>مكافأة تسجيل الدخول: ${plan.loginBonus}</p>` : ''}
                </div>
                <button class="subscribe-btn">اشتراك الآن</button>
            `;
            vipPlansContainer.appendChild(planElement);
        });
    }
    
    function createInviteContent() {
        const inviteSection = document.createElement('div');
        inviteSection.id = 'invite';
        inviteSection.className = 'content-section';
        inviteSection.innerHTML = `
            <div class="section-header">
                <h2>دعوة الأصدقاء</h2>
                <p>ادعُ أصدقاءك واحصل على عمولة تصل إلى 26%</p>
            </div>
            <div class="invite-stats">
                <div class="stat">
                    <h3>عدد المدعوين</h3>
                    <p>0</p>
                </div>
                <div class="stat">
                    <h3>أرباح الإحالات</h3>
                    <p>0.00 $</p>
                </div>
            </div>
            <div class="referral-code">
                <h3>كود الإحالة الخاص بك</h3>
                <div class="code-box">
                    <p>BKS-${Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                    <button class="copy-btn">نسخ</button>
                </div>
            </div>
            <div class="invite-instructions">
                <h3>كيفية الدعوة:</h3>
                <p>1. شارك كود الإحالة مع أصدقائك</p>
                <p>2. عند تسجيلهم باستخدام الكود، يصبحون جزءًا من فريقك</p>
                <p>3. احصل على نسبة من أرباحهم</p>
            </div>
        `;
        document.querySelector('.main-content').appendChild(inviteSection);
    }
    
    function createTasksContent() {
        const tasksSection = document.createElement('div');
        tasksSection.id = 'tasks';
        tasksSection.className = 'content-section';
        tasksSection.innerHTML = `
            <div class="section-header">
                <h2>المهام اليومية</h2>
                <p>أكمل المهام واربح المزيد</p>
            </div>
            <div class="tasks-container">
                <div class="task-card locked">
                    <i class="fas fa-calendar-check"></i>
                    <h3>التسجيل اليومي</h3>
                    <p>سجل دخولك يوميًا لتحصل على مكافأة</p>
                    <span class="lock-icon"><i class="fas fa-lock"></i></span>
                </div>
                <div class="task-card locked">
                    <i class="fas fa-ad"></i>
                    <h3>مشاهدة الإعلانات</h3>
                    <p>شاهد الإعلانات واربح المال</p>
                    <span class="lock-icon"><i class="fas fa-lock"></i></span>
                </div>
                <div class="task-card">
                    <i class="fas fa-gamepad"></i>
                    <h3>ألعاب تفاعلية</h3>
                    <p>العب واربح المكافآت</p>
                    <button class="play-btn">لعب</button>
                </div>
            </div>
        `;
        document.querySelector('.main-content').appendChild(tasksSection);
    }
    
    function createProfileContent() {
        const profileSection = document.createElement('div');
        profileSection.id = 'profile';
        profileSection.className = 'content-section';
        profileSection.innerHTML = `
            <div class="section-header">
                <h2>حسابي</h2>
            </div>
            <div class="profile-info">
                <div class="info-item">
                    <span>اسم المستخدم:</span>
                    <span>مستخدم جديد</span>
                </div>
                <div class="info-item">
                    <span>البريد الإلكتروني:</span>
                    <span>example@email.com</span>
                </div>
                <div class="info-item">
                    <span>رقم ID:</span>
                    <span>BKS-${Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div class="info-item">
                    <span>تاريخ التسجيل:</span>
                    <span>${new Date().toLocaleDateString('ar-EG')}</span>
                </div>
            </div>
            <div class="profile-actions">
                <button class="action-btn"><i class="fas fa-history"></i> سجلات السحب</button>
                <button class="action-btn"><i class="fas fa-coins"></i> سجلات الإيداع</button>
                <button class="action-btn"><i class="fas fa-cog"></i> الإعدادات</button>
                <button class="action-btn"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</button>
            </div>
        `;
        document.querySelector('.main-content').appendChild(profileSection);
    }
    
    // إعداد معلومات طرق السحب
    function setupWithdrawMethods() {
        const withdrawOptions = document.querySelectorAll('.withdraw-options .option');
        const withdrawInfo = document.getElementById('withdrawInfo');
        
        const methodDetails = {
            bitcoin: {
                name: "Bitcoin",
                info: "الحد الأدنى للسحب: 0.001 BTC\nالعمولة: 0.0005 BTC\nوقت المعالجة: 1-24 ساعة"
            },
            ethereum: {
                name: "Ethereum",
                info: "الحد الأدنى للسحب: 0.01 ETH\nالعمولة: 0.005 ETH\nوقت المعالجة: 1-24 ساعة"
            },
            usdt: {
                name: "Tether",
                info: "الحد الأدنى للسحب: 10 USDT\nالعمولة: 1 USDT\nوقت المعالجة: 1-24 ساعة"
            },
            bnb: {
                name: "Binance Coin",
                info: "الحد الأدنى للسحب: 0.1 BNB\nالعمولة: 0.01 BNB\nوقت المعالجة: 1-24 ساعة"
            },
            visa: {
                name: "Visa",
                info: "الحد الأدنى للسحب: 10$\nالعمولة: 1$\nوقت المعالجة: 3-5 أيام عمل"
            },
            mastercard: {
                name: "MasterCard",
                info: "الحد الأدنى للسحب: 10$\nالعمولة: 1$\nوقت المعالجة: 3-5 أيام عمل"
            },
            amex: {
                name: "American Express",
                info: "الحد الأدنى للسحب: 10$\nالعمولة: 1$\nوقت المعالجة: 3-5 أيام عمل"
            },
            paypal: {
                name: "PayPal",
                info: "الحد الأدنى للسحب: 5$\nالعمولة: 0.5$\nوقت المعالجة: 1-2 أيام عمل"
            },
            skrill: {
                name: "Skrill",
                info: "الحد الأدنى للسحب: 5$\nالعمولة: 0.5$\nوقت المعالجة: 1-2 أيام عمل"
            },
            neteller: {
                name: "Neteller",
                info: "الحد الأدنى للسحب: 5$\nالعمولة: 0.5$\nوقت المعالجة: 1-2 أيام عمل"
            },
            bank: {
                name: "حوالة بنكية",
                info: "الحد الأدنى للسحب: 50$\nالعمولة: 5$\nوقت المعالجة: 3-7 أيام عمل"
            },
            mobile: {
                name: "محافظ متنقلة",
                info: "الحد الأدنى للسحب: 5$\nالعمولة: 0.5$\nوقت المعالجة: فوري إلى 24 ساعة"
            }
        };
        
        withdrawOptions.forEach(option => {
            option.addEventListener('click', function() {
                const method = this.getAttribute('data-method');
                const details = methodDetails[method];
                
                withdrawInfo.innerHTML = `
                    <h3>معلومات السحب - ${details.name}</h3>
                    <div class="method-details">
                        ${details.info.split('\n').map(line => `<p>${line}</p>`).join('')}
                    </div>
                    <button class="withdraw-request-btn">طلب سحب</button>
                `;
            });
        });
    }
});
