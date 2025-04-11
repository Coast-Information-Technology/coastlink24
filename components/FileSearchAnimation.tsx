import { motion } from "framer-motion";
import { FiFile, FiFolder, FiSearch } from "react-icons/fi";

const FileSearchAnimation = () => {
  // Mock files for the animation
  const files = [
    { id: 1, name: "document.pdf", type: "file" },
    { id: 2, name: "images", type: "folder" },
    { id: 3, name: "report.docx", type: "file" },
    { id: 4, name: "project", type: "folder" },
  ];

  return (
    <div className="relative w-64 h-64">
      {/* Magnifying glass */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: [-20, 0, -10, 0, -5, 0], // Slight wobble effect
          y: [-10, 0, -5, 0, -2, 0], // Slight wobble effect
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
        className="absolute top-4 left-4 text-blue-500 text-3xl"
      >
        <FiSearch />
      </motion.div>

      {/* Search beam effect */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 180 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute top-8 left-12 h-1 bg-blue-200 rounded-full origin-left"
      />

      {/* Files popping up */}
      <div className="absolute top-16 left-8 space-y-2">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.8 + index * 0.15,
                type: "spring",
                stiffness: 300,
              },
            }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center p-2 bg-white rounded shadow-sm"
          >
            <div className="mr-2 text-blue-500">
              {file.type === "file" ? <FiFile /> : <FiFolder />}
            </div>
            <span className="text-sm truncate">{file.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Background circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.3,
          type: "spring",
          damping: 10,
        }}
        className="absolute -z-10 top-0 left-0 w-64 h-64 rounded-full bg-blue-50 opacity-70"
      />
    </div>
  );
};

export default FileSearchAnimation;
