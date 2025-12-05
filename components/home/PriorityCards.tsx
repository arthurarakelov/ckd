import React from 'react';
import { Card } from '@/components/ui/Card';
import { Trophy, Calendar, Users } from 'lucide-react';

export function PriorityCards() {
  return (
    <div className="grid grid-cols-3 gap-3 px-4">
      <Card className="p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-10 h-10 bg-warning-light rounded-full flex items-center justify-center">
          <Trophy className="text-warning" size={20} />
        </div>
        <span className="text-xs text-center font-medium text-gray-700">
          Daily Rewards
        </span>
      </Card>

      <Card className="p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          <Calendar className="text-primary-600" size={20} />
        </div>
        <span className="text-xs text-center font-medium text-gray-700">
          Planning
        </span>
      </Card>

      <Card className="p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center">
          <Users className="text-accent" size={20} />
        </div>
        <span className="text-xs text-center font-medium text-gray-700">
          Connect
        </span>
      </Card>
    </div>
  );
}
