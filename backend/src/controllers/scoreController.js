export const submitScore = async (req, res) => {
    const userId = req.user.id; // comes from middleware!
  
    const { score } = req.body;
  
    // Save the score for this user...
  };
  