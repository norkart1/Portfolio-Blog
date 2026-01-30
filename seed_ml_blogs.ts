import mongoose from 'mongoose';
import connectDB from './src/lib/db/mongodb';
import { Post } from './src/models/Post';
import { Category } from './src/models/Category';

async function seed() {
  await connectDB();
  
  // 1. Create Malayalam category
  let malCategory = await Category.findOne({ name: 'Malayalam' });
  if (!malCategory) {
    malCategory = await Category.create({ name: 'Malayalam' });
    console.log('Created Malayalam category');
  }

  const posts = [
    {
      title: 'ജീവിതത്തിലെ ചെറിയ സന്തോഷങ്ങൾ',
      content: '<p>ജീവിതം എന്നത് വലിയ നേട്ടങ്ങളുടെ മാത്രം സമാഹാരമല്ല, മറിച്ച് നാം ഓരോ ദിവസവും അനുഭവിക്കുന്ന ചെറിയ സന്തോഷങ്ങളുടെ കൂട്ടായ അനുഭവമാണ്. ഒരു കപ്പ് ചായ, നല്ലൊരു പുസ്തകം, അല്ലെങ്കിൽ വൈകുന്നേരത്തെ നടത്തം - ഇവയെല്ലാം നമുക്ക് നൽകുന്ന സമാധാനം വാക്കുകൾക്ക് അതീതമാണ്.</p>',
      category: malCategory._id,
      language: 'ml',
      author: 'അഡ്മിൻ',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1080&auto=format&fit=crop',
      readTime: '4 min read',
      textAlign: 'left',
      textColor: '#333333'
    },
    {
      title: 'പ്രകൃതിയുടെ മനോഹാരിത',
      content: '<p>കേരളത്തിന്റെ പച്ചപ്പും പ്രകൃതി ഭംഗിയും ലോകപ്രശസ്തമാണ്. നമ്മുടെ ചുറ്റുമുള്ള പ്രകൃതിയെ സംരക്ഷിക്കേണ്ടത് ഓരോ പൗരന്റെയും കടമയാണ്. പച്ചപ്പും ശുദ്ധവായുവും നമ്മുടെ ആരോഗ്യത്തിന് അത്യന്താപേക്ഷിതമാണ്.</p>',
      category: malCategory._id,
      language: 'ml',
      author: 'അഡ്മിൻ',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1080&auto=format&fit=crop',
      readTime: '5 min read',
      textAlign: 'left',
      textColor: '#333333'
    },
    {
      title: 'വായനയുടെ പ്രാധാന്യം',
      content: '<p>വായിച്ചു വളരുക, ചിന്തിച്ചു വിവേകം നേടുക എന്നത് മഹത്തായ ഒരു സന്ദേശമാണ്. വായന നമ്മുടെ അറിവ് വർദ്ധിപ്പിക്കുക മാത്രമല്ല, പുതിയ ലോകങ്ങളെ പരിചയപ്പെടുത്തി തരികയും ചെയ്യുന്നു. ഇന്നത്തെ ഡിജിറ്റൽ യുഗത്തിലും പുസ്തകങ്ങൾക്കുള്ള സ്ഥാനം സവിശേഷമാണ്.</p>',
      category: malCategory._id,
      language: 'ml',
      author: 'അഡ്മിൻ',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1080&auto=format&fit=crop',
      readTime: '6 min read',
      textAlign: 'left',
      textColor: '#333333'
    },
    {
      title: 'സൗഹൃദത്തിന്റെ വില',
      content: '<p>മനുഷ്യ ജീവിതത്തിൽ സൗഹൃദത്തിന് വലിയ സ്ഥാനമാണുള്ളത്. നല്ലൊരു സുഹൃത്ത് ഉണ്ടെങ്കിൽ ഏതൊരു പ്രതിസന്ധിയെയും നമുക്ക് തരണം ചെയ്യാൻ സാധിക്കും. നിസ്വാർത്ഥമായ സൗഹൃദങ്ങൾ നമ്മുടെ ജീവിതത്തെ കൂടുതൽ അർത്ഥവത്താക്കുന്നു.</p>',
      category: malCategory._id,
      language: 'ml',
      author: 'അഡ്മിൻ',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1080&auto=format&fit=crop',
      readTime: '3 min read',
      textAlign: 'left',
      textColor: '#333333'
    },
    {
      title: 'നല്ല ശീലങ്ങൾ ജീവിതത്തിൽ',
      content: '<p>നമ്മുടെ ശീലങ്ങളാണ് നമ്മുടെ സ്വഭാവം രൂപപ്പെടുത്തുന്നത്. പുലർച്ചെ എഴുന്നേൽക്കുന്നത് മുതൽ രാത്രി ഉറങ്ങുന്നത് വരെയുള്ള കാര്യങ്ങളിൽ ക്രമീകരണം ഉണ്ടെങ്കിൽ ജീവിതം കൂടുതൽ വിജയകരമാകും. നല്ല ശീലങ്ങൾ വളർത്തിയെടുക്കാൻ പ്രായം ഒരു തടസ്സമല്ല.</p>',
      category: malCategory._id,
      language: 'ml',
      author: 'അഡ്മിൻ',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1080&auto=format&fit=crop',
      readTime: '4 min read',
      textAlign: 'left',
      textColor: '#333333'
    }
  ];

  for (const post of posts) {
    await Post.create(post);
    console.log(`Created post: ${post.title}`);
  }

  console.log('Seeding completed!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
