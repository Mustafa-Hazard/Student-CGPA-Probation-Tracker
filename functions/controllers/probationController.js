import pool from '../config/db.js';

// @desc    Get probation data with dynamic CGPA calculations
// @route   GET /api/probation
export const getProbationData = async (req, res) => {
    const { year, semester } = req.query;

    if (!year || !semester) {
        return res.status(400).json({ error: 'Year and semester parameters are required.' });
    }

    const QUERY = `
    SELECT 
      m.regno AS student_id, 
      s.name, 
      ROUND(TotalActualGPA / TotalCreditHours, 2) AS cgpa
    FROM (
      SELECT 
        cm.regno, 
        r.year, 
        r.semester, 
        SUM((c.theory + c.lab) * g.gpa) AS TotalActualGPA,
        SUM(c.theory + c.lab) AS TotalCreditHours
      FROM cmarks cm
      JOIN head h ON cm.hid = h.hid
      JOIN grade g ON ROUND(cm.marks) BETWEEN g.start AND g."end"
      JOIN recap r ON cm.rid = r.rid
      JOIN course c ON r.cid = c.cid
      WHERE cm.hid = 246 AND r.year = $1 AND r.semester = $2
      GROUP BY cm.regno, r.year, r.semester
    ) AS m
    JOIN student s ON m.regno = s.regno
    WHERE ROUND(TotalActualGPA / TotalCreditHours, 2) < 2.0
    ORDER BY s.name;
  `;

    try {
        const result = await pool.query(QUERY, [year, semester]);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error in getProbationData:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

// @desc    Get dropdown configuration values
// @route   GET /api/filters
export const getFilters = async (req, res) => {
    try {
        const [yearsResult, semestersResult] = await Promise.all([
            pool.query('SELECT DISTINCT year FROM recap ORDER BY year'),
            pool.query('SELECT DISTINCT semester FROM recap ORDER BY semester')
        ]);

        res.json({
            years: yearsResult.rows.map(row => row.year),
            semesters: semestersResult.rows.map(row => row.semester)
        });
    } catch (err) {
        console.error('Error fetching filters:', err);
        res.status(500).json({ error: 'Failed to fetch filters' });
    }
};