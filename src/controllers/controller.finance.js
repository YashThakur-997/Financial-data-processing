const prisma = require('../lib/prisma');

const addRecord = async (req, res) => {
  try {
    const { amount, type, category, description , userId } = req.body;
    // Ensure category is uppercase
    const normalizedCategory = category ? category.toUpperCase() : undefined;

    const record = await prisma.FinancialRecord.create({
      data: {
        amount,        // Prisma handles the Decimal conversion
        type,          // 'INCOME' or 'EXPENSE'
        category: normalizedCategory,
        description,
        userId
      }
    });

    res.status(201).json(record);
  } catch (error) {
    // console.error("Error creating record:", error);
    res.status(500).json({ error: "Failed to create record" });
  }
};


// Get all records for the authenticated user , user access only their records
const getRecords = async (req, res) => {
  try {
    const userId = req.user.id; // From your Auth Middleware (JWT)
    const records = await prisma.FinancialRecord.findMany({
      where: { userId }
    });
    if (records.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }
    res.status(200).json(records);
  } catch (error) {
    // console.error("Error fetching records:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await prisma.FinancialRecord.findMany();
    if (records.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }
    res.status(200).json(records);
  } catch (error) {
    // console.error("Error fetching records:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};


const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await prisma.FinancialRecord.findUnique({
      where: { id: parseInt(id) }
    });
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    await prisma.FinancialRecord.delete({
      where: { id: parseInt(id)  }
    });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    // console.error("Error deleting record:", error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};

const editRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, description , userId } = req.body;
    const record = await prisma.FinancialRecord.findUnique({
      where: { id: parseInt(id)  }
    });
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    // Ensure category is uppercase
    const normalizedCategory = category ? category.toUpperCase() : undefined;
    const updatedRecord = await prisma.FinancialRecord.update({
      where: { id: parseInt(id) },
      data: {
        amount,
        type,
        category: normalizedCategory,
        description,
        userId
      }
    });
    res.json(updatedRecord);
  } catch (error) {
    // console.error("Error editing record:", error);
    res.status(500).json({ error: "Failed to edit record" });
  }
};


module.exports = {addRecord, getRecords, getAllRecords, deleteRecord, editRecord};