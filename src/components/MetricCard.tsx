import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  color?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  description,
  color = 'blue',
  trend
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      className={`
        bg-white rounded-lg shadow-md p-6 
        border-l-4 border-${color}-500 
        hover:shadow-lg transition-all
        backdrop-blur-sm bg-white/90
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <motion.div
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          className={`text-${color}-500`}
        >
          {icon}
        </motion.div>
      </div>
      
      <div className="flex items-end space-x-2 mb-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className={`
            flex items-center space-x-1 text-sm
            ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}
          `}>
            <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-600">{description}</p>
      
      <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: value }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-${color}-500 rounded-full`}
        />
      </div>
    </motion.div>
  );
};