import { motion } from "framer-motion";

export default function SectionTitle({title, subtitle}) {
  return (
    <motion.div
      initial={{opacity:0, y:30}}
      whileInView={{opacity:1, y:0}}
      transition={{duration:0.6}}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-primary">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
