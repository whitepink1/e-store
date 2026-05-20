'use client'
import React, { useState } from 'react';
import { SpecificationGroup } from '../../lib/validations/product';

interface SpecificationProps {
  specifications: SpecificationGroup[];
}

const ProductSpecification = ({specifications}: SpecificationProps) => {
    if (!specifications || specifications.length === 0) return null;
    
    const [isOpen, setIsOpen] = useState(false);
    const MAX_LINES = 8;
    let visibleSpecifications: SpecificationGroup[] = specifications;

    if (!isOpen) {
        let currentLinesCount = 0;

        visibleSpecifications = specifications.reduce<SpecificationGroup[]>((acc, group) => {
            if (currentLinesCount >= MAX_LINES) return acc;
            const groupLines = 1 + group.specs.length;

            if (currentLinesCount < MAX_LINES) {
                if (currentLinesCount + groupLines <= MAX_LINES) {
                acc.push(group);
                currentLinesCount += groupLines;
                } 
                else {
                const remainingLinesForSpecs = MAX_LINES - currentLinesCount - 1;
    
                if (remainingLinesForSpecs > 0) {
                    acc.push({
                    ...group,
                    specs: group.specs.slice(0, remainingLinesForSpecs)
                    });
                }
                currentLinesCount = MAX_LINES;
                }
            };

            return acc;
        }, []);
    };

    const totalOriginalSpecs = specifications.reduce((sum, g) => sum + g.specs.length, 0);
    const showButton = totalOriginalSpecs > MAX_LINES;

    return (
            <div className="w-full bg-white">
                <div className="flex flex-col gap-10">
                    {visibleSpecifications.map((group) => (
                    <div key={group.groupName} className="flex flex-col gap-3">
                        <h3 className="text-xl font-medium leading-6">
                            {group.groupName}
                        </h3>
                        <div className="flex flex-col gap-6">
                            {group.specs.map((spec) => (
                                <div key={spec.name} className="flex justify-between text-base leading-6 pb-2 border-b border-gray-75">
                                    <span>{spec.name}</span>
                                    <span className="text-[15px]">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>

                {showButton && (
                    <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex details-button mx-auto mt-8 cursor-pointer select-none shadow-lg hover:border-black hover:scale-105 hover:shadow-xl transition-all"
                    >
                    {isOpen ? 'Show less specifications ↑' : 'Show full specifications ↓'}
                    </button>
                )}
            </div>
    )
}

export default ProductSpecification