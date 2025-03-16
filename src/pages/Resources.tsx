
import React from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { ResourceCard } from '@/components/period/ResourceCard';

const Resources = () => {
  const resources = [
    {
      title: "Understanding Your Menstrual Cycle",
      description: "A comprehensive guide to the four phases of your menstrual cycle and what happens in your body.",
      category: "Health",
      image: "https://images.unsplash.com/photo-1577896851864-99f8b56f2d3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "https://www.womenshealth.gov/menstrual-cycle/your-menstrual-cycle"
    },
    {
      title: "Managing Menstrual Pain",
      description: "Tips and techniques for dealing with cramps and discomfort during your period.",
      category: "Tips",
      image: "https://images.unsplash.com/photo-1559748128-4dd71db1f2ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "https://www.mayoclinic.org/diseases-conditions/menstrual-cramps/diagnosis-treatment/drc-20374944"
    },
    {
      title: "Nutrition During Your Period",
      description: "Foods that can help alleviate symptoms and boost your energy during menstruation.",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "https://www.healthline.com/health/food-nutrition/what-to-eat-during-period"
    },
    {
      title: "Exercise and Your Cycle",
      description: "How to adapt your workout routine to your menstrual cycle phases for optimal results.",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "https://www.womenshealthmag.com/fitness/a19994341/exercise-during-period/"
    },
    {
      title: "PCOS and Period Management",
      description: "Understanding polycystic ovary syndrome and its impact on your menstrual cycle.",
      category: "PCOS",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353439"
    },
    {
      title: "Sustainable Period Products",
      description: "Eco-friendly alternatives to traditional menstrual products.",
      category: "Hygiene",
      image: "https://images.unsplash.com/photo-1594824475969-32572cd1ce0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "https://www.nationalgeographic.com/environment/article/how-to-have-a-plastic-free-period"
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-2">
          Period Health Resources
        </h1>
        <p className="text-muted-foreground mb-8">
          Discover helpful articles, guides, and tools to support your menstrual health
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              category={resource.category}
              image={resource.image}
              link={resource.link}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Resources;
