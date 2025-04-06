


async function del(prisma,req,res){
    const { id } = req.params;

    // Check if presentation exists
    const exists = await prisma.presentation.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    // Delete the presentation (cascades to related slides)
    await prisma.presentation.delete({
      where: { id },
    });

    return res.json({ message: "Presentation deleted successfully" });
}

module.exports = del;