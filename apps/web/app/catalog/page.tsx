'use client'
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { browseCategory } from "../../lib/data";




const page = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-8">
      {browseCategory.map((item) => (
        <motion.div
            key={item.name}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
            <Link
                href={item.url}
                className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-gray-200/55 bg-gray-100/55 hover:bg-black/80 hover:text-white transition-all duration-300 group aspect-square"
            >
                <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                <Image 
                    src={item.img} 
                    fill
                    className="object-contain transition-all duration-300 group-hover:invert" 
                    alt={item.name} 
                />
                </div>
                
                <p className="font-medium text-sm md:text-base text-center">
                {item.name}
                </p>
            </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default page