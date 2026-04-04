const prisma = require('../lib/prisma');

const getUserDashboard = async (req, res) => {
    try {
        const { id, role } = req.user;

        // Requirement 4: Role-based filtering
        // Admin/Analyst see everything; Viewers see only their own data.
        const isPowerUser = (role === 'ADMIN' || role === 'ANALYST');
        const queryFilter = isPowerUser ? {} : { userId: id };

        // Run 3 independent queries in parallel
        const [aggregations, categoryData, recentActivity] = await Promise.all([
            // A. Calculate Total Income & Expense
            prisma.FinancialRecord.groupBy({
                by: ['type'],
                where: queryFilter,
                _sum: { amount: true },
            }),

            // B. Category Distribution (Pie Chart Data, split by type)
            prisma.FinancialRecord.groupBy({
                by: ['category', 'type'],
                where: queryFilter,
                _sum: { amount: true },
            }),

            // C. Recent Transaction Feed
            prisma.FinancialRecord.findMany({
                where: queryFilter,
                orderBy: { date: 'desc' },
                take: 5,
                include: {
                    user: isPowerUser ? { select: { email: true } } : false
                }
            })
        ]);

        // Format Totals for easy Frontend consumption
        const stats = {
            income: Number(aggregations.find(a => a.type === 'INCOME')?._sum.amount || 0),
            expense: Number(aggregations.find(a => a.type === 'EXPENSE')?._sum.amount || 0),
        };
        if (isPowerUser) {
            // Count ALL financial transactions in the system
            stats.totalRecords = await prisma.financialRecord.count();

            // Count only the regular customers/viewers (Excluding ADMIN and ANALYST)
            stats.totalUsers = await prisma.user.count({
                where: {
                    role: 'USER'
                }
            });
        }
        else {
            stats.balance = stats.income - stats.expense;
        }

        res.status(200).json({
            success: true,
            user: {
                email: req.user.email,
                role: role,
                scope: isPowerUser ? "Global System View" : "Personal View"
            },
            summary: stats,
            // Group categoryData by category, then split by type
            chartData: (() => {
                const grouped = {};
                for (const c of categoryData) {
                    if (!grouped[c.category]) grouped[c.category] = { income: 0, expense: 0 };
                    if (c.type === 'INCOME') grouped[c.category].income = Number(c._sum.amount);
                    else if (c.type === 'EXPENSE') grouped[c.category].expense = Number(c._sum.amount);
                }
                // Convert to array for frontend
                return Object.entries(grouped).map(([category, { income, expense }]) => ({
                    category,
                    income,
                    expense
                }));
            })(),
            recentTransactions: recentActivity
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ error: "Could not load dashboard data" });
    }
};

module.exports = { getUserDashboard };