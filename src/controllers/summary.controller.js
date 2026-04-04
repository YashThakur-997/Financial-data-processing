const prisma = require('../lib/prisma');

//only for user to get summary of their financial records
const getSummary = async (req, res) => {
  try {
    const userId = req.user.id; // From your Auth Middleware (JWT)
    const records = await prisma.FinancialRecord.findMany({
      where: {
        userId
      }
    });
    const summary = records.reduce((acc, record) => {
      if (record.type === 'INCOME') {
        acc.totalIncome += parseFloat(record.amount);
      } else {
        acc.totalExpenses += parseFloat(record.amount);
      }
      acc.netBalance = acc.totalIncome - acc.totalExpenses;
      return acc;
    }, { totalIncome: 0, totalExpenses: 0, netBalance: 0 });

    res.status(200).json(summary);
  } catch (error) {
    // console.error("Error fetching summary:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};

//summary for admin and analyst to get overall summary of all records in the system
const getOverallSummary = async (req, res) => {
  try {
    const records = await prisma.FinancialRecord.findMany();
    const summary = records.reduce((acc, record) => {
      if (record.type === 'INCOME') {
        acc.totalIncome += parseFloat(record.amount);
      } else {
        acc.totalExpenses += parseFloat(record.amount);
      }
      return acc;
    }, { totalIncome: 0, totalExpenses: 0 });

    res.status(200).json(summary);
  } catch (error) {
    // console.error("Error fetching overall summary:", error);
    res.status(500).json({ error: "Failed to fetch overall summary" });
  }
};

// category-wise summary for user
const getCategoryWiseSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const records = await prisma.FinancialRecord.findMany({
      where: {
        userId
      }
    });

    const summary = records.reduce((acc, record) => {
      const category = record.category;
      if (!acc[category]) {
        acc[category] = { totalIncome: 0, totalExpenses: 0 };
      }
      if (record.type === 'INCOME') {
        acc[category].totalIncome += parseFloat(record.amount);
      } else {
        acc[category].totalExpenses += parseFloat(record.amount);
      }
      return acc;
    }, {});

    res.status(200).json(summary);
  } catch (error) {
    // console.error("Error fetching category-wise summary:", error);
    res.status(500).json({ error: "Failed to fetch category-wise summary" });
  }
};


//category-wise summary for admin and analyst to get overall category-wise summary of all records in the system
const getOverallCategoryWiseSummary = async (req, res) => {
  try {
    const records = await prisma.FinancialRecord.findMany();
    const summary = records.reduce((acc, record) => {
      const category = record.category;
      if (!acc[category]) {
        acc[category] = { totalIncome: 0, totalExpenses: 0 };
      }
      if (record.type === 'INCOME') {
        acc[category].totalIncome += parseFloat(record.amount);
      } else {
        acc[category].totalExpenses += parseFloat(record.amount);
      }
      return acc;
    }, {});

    res.status(200).json(summary);
  } catch (error) {
    // console.error("Error fetching overall category-wise summary:", error);
    res.status(500).json({ error: "Failed to fetch overall category-wise summary" });
  }
};

module.exports = { getSummary, getOverallSummary, getCategoryWiseSummary, getOverallCategoryWiseSummary };