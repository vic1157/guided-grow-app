import { useState } from "react";
import Footer from "@/components/Footer";
import ActivityPanel from "@/components/ActivityPanel";
import { Type } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Bible content data structure
interface Verse {
  number: number;
  text: string;
}

interface Section {
  title?: string;
  verses: Verse[];
}

interface Chapter {
  id: string;
  book: string;
  chapter: number;
  title: string;
  sections: Section[];
}

const Read = () => {
  const [selectedTranslation, setSelectedTranslation] = useState("NLT");
  const [fontSize, setFontSize] = useState("medium"); // small, medium, large
  const [selectedChapter, setSelectedChapter] = useState("matthew-5");
  const [isReadingActive, setIsReadingActive] = useState(false);

  const handleStartScroll = () => {
    setIsReadingActive(true);
    // TODO: Implement scroll creation logic
  };

  // Sample Bible chapters
  const bibleChapters: Chapter[] = [
    {
      id: "matthew-5",
      book: "Matthew",
      chapter: 5,
      title: "The Sermon on the Mount",
      sections: [
        {
          verses: [
            {
              number: 1,
              text: "One day as he saw the crowds gathering, Jesus went up on the mountainside and sat down. His disciples gathered around him,",
            },
            {
              number: 2,
              text: "and he began to teach them.",
            },
          ],
        },
        {
          title: "The Beatitudes",
          verses: [
            {
              number: 3,
              text: "God blesses those who are poor and realize their need for him, for the Kingdom of Heaven is theirs.",
            },
            {
              number: 4,
              text: "God blesses those who mourn, for they will be comforted.",
            },
            {
              number: 5,
              text: "God blesses those who are humble, for they will inherit the whole earth.",
            },
            {
              number: 6,
              text: "God blesses those who hunger and thirst for justice, for they will be shown mercy.",
            },
            {
              number: 7,
              text: "God blesses those who are merciful, for they will be shown mercy.",
            },
            {
              number: 8,
              text: "God blesses those whose hearts are pure, for they will see God.",
            },
            {
              number: 9,
              text: "God blesses those who work for peace, for they will be called the children of God.",
            },
            {
              number: 10,
              text: "God blesses those who are persecuted for doing right, for the Kingdom of Heaven is theirs.",
            },
            {
              number: 11,
              text: "God blesses you when people mock you and persecute you and lie about you and say all sorts of evil things against you because you are my followers.",
            },
            {
              number: 12,
              text: "Be happy about it! Be very glad! For a great reward awaits you in heaven. And remember, the ancient prophets were persecuted in the same way.",
            },
          ],
        },
        {
          title: "Teaching about Salt and Light",
          verses: [
            {
              number: 13,
              text: 'You are the salt of the earth. But what good is salt if it has lost its flavor? Can you make it salty again? It will be thrown out and trampled underfoot as worthless.',
            },
            {
              number: 14,
              text: 'You are the light of the world—like a city on a hilltop that cannot be hidden.',
            },
            {
              number: 15,
              text: 'No one lights a lamp and then puts it under a basket. Instead, a lamp is placed on a stand, where it gives light to everyone in the house.',
            },
            {
              number: 16,
              text: 'In the same way, let your good deeds shine out for all to see, so that everyone will praise your heavenly Father.',
            },
          ],
        },
        {
          title: "Teaching about the Law",
          verses: [
            {
              number: 17,
              text: 'Don\'t misunderstand why I have come. I did not come to abolish the law of Moses or the writings of the prophets. No, I came to accomplish their purpose.',
            },
            {
              number: 18,
              text: 'I tell you the truth, until heaven and earth disappear, not even the smallest detail of God\'s law will disappear until its purpose is achieved.',
            },
            {
              number: 19,
              text: 'So if you ignore the least commandment and teach others to do the same, you will be called the least in the Kingdom of Heaven. But anyone who obeys God\'s laws and teaches them will be called great in the Kingdom of Heaven.',
            },
            {
              number: 20,
              text: 'But I warn you—unless your righteousness is better than the righteousness of the teachers of religious law and the Pharisees, you will never enter the Kingdom of Heaven!',
            },
          ],
        },
        {
          title: "Teaching about Anger",
          verses: [
            {
              number: 21,
              text: 'You have heard that our ancestors were told, "You must not murder. If you commit murder, you are subject to judgment."',
            },
            {
              number: 22,
              text: 'But I say, if you are even angry with someone, you are subject to judgment! If you call someone an idiot, you are in danger of being brought before the court. And if you curse someone, you are in danger of the fires of hell.',
            },
            {
              number: 23,
              text: 'So if you are presenting a sacrifice at the altar in the Temple and you suddenly remember that someone has something against you,',
            },
            {
              number: 24,
              text: 'leave your sacrifice there at the altar. Go and be reconciled to that person. Then come and offer your sacrifice to God.',
            },
          ],
        },
      ],
    },
    {
      id: "john-3",
      book: "John",
      chapter: 3,
      title: "Jesus and Nicodemus",
      sections: [
        {
          verses: [
            {
              number: 1,
              text: "There was a man named Nicodemus, a Jewish religious leader who was a Pharisee.",
            },
            {
              number: 2,
              text: 'After dark one evening, he came to speak with Jesus. "Rabbi," he said, "we all know that God has sent you to teach us. Your miraculous signs are evidence that God is with you."',
            },
            {
              number: 3,
              text: 'Jesus replied, "I tell you the truth, unless you are born again, you cannot see the Kingdom of God."',
            },
            {
              number: 4,
              text: '"What do you mean?" exclaimed Nicodemus. "How can an old man go back into his mother\'s womb and be born again?"',
            },
            {
              number: 5,
              text: 'Jesus replied, "I assure you, no one can enter the Kingdom of God without being born of water and the Spirit. Humans can reproduce only human life, but the Holy Spirit gives birth to spiritual life."',
            },
            {
              number: 6,
              text: "Humans can reproduce only human life, but the Holy Spirit gives birth to spiritual life.",
            },
            {
              number: 7,
              text: 'So don\'t be surprised when I say, "You must be born again."',
            },
            {
              number: 8,
              text: 'The wind blows wherever it wants. Just as you can hear the wind but can\'t tell where it comes from or where it is going, so you can\'t explain how people are born of the Spirit.',
            },
            {
              number: 9,
              text: '"How are these things possible?" Nicodemus asked.',
            },
            {
              number: 10,
              text: 'Jesus replied, "You are a respected Jewish teacher, and yet you don\'t understand these things?"',
            },
            {
              number: 11,
              text: 'I assure you, we tell you what we know and have seen, and yet you won\'t believe our testimony.',
            },
            {
              number: 12,
              text: "But if you don't believe me when I tell you about earthly things, how can you possibly believe if I tell you about heavenly things?",
            },
            {
              number: 13,
              text: "No one has ever gone to heaven and returned. But the Son of Man has come down from heaven.",
            },
            {
              number: 14,
              text: "And as Moses lifted up the bronze snake on a pole in the wilderness, so the Son of Man must be lifted up,",
            },
            {
              number: 15,
              text: "so that everyone who believes in him will have eternal life.",
            },
            {
              number: 16,
              text: "For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.",
            },
            {
              number: 17,
              text: "God sent his Son into the world not to judge the world, but to save the world through him.",
            },
            {
              number: 18,
              text: 'There is no judgment against anyone who believes in him. But anyone who does not believe in him has already been judged for not believing in God\'s one and only Son.',
            },
            {
              number: 19,
              text: "And the judgment is based on this fact: God's light came into the world, but people loved the darkness more than the light, for their actions were evil.",
            },
            {
              number: 20,
              text: "All who do evil hate the light and refuse to go near it for fear their sins will be exposed.",
            },
            {
              number: 21,
              text: "But those who do what is right come to the light so others can see that they are doing what God wants.",
            },
          ],
        },
      ],
    },
    {
      id: "psalm-23",
      book: "Psalms",
      chapter: 23,
      title: "The LORD is My Shepherd",
      sections: [
        {
          verses: [
            {
              number: 1,
              text: "The LORD is my shepherd; I have all that I need.",
            },
            {
              number: 2,
              text: "He lets me rest in green meadows; he leads me beside peaceful streams.",
            },
            {
              number: 3,
              text: "He renews my strength. He guides me along right paths, bringing honor to his name.",
            },
            {
              number: 4,
              text: "Even when I walk through the darkest valley, I will not be afraid, for you are close beside me. Your rod and your staff protect and comfort me.",
            },
            {
              number: 5,
              text: "You prepare a feast for me in the presence of my enemies. You honor me by anointing my head with oil. My cup overflows with blessings.",
            },
            {
              number: 6,
              text: "Surely your goodness and unfailing love will pursue me all the days of my life, and I will live in the house of the LORD forever.",
            },
          ],
        },
      ],
    },
    {
      id: "genesis-1",
      book: "Genesis",
      chapter: 1,
      title: "The Creation",
      sections: [
        {
          title: "The First Day - Light",
          verses: [
            {
              number: 1,
              text: "In the beginning God created the heavens and the earth.",
            },
            {
              number: 2,
              text: "The earth was formless and empty, and darkness covered the deep waters. And the Spirit of God was hovering over the surface of the waters.",
            },
            {
              number: 3,
              text: 'Then God said, "Let there be light," and there was light.',
            },
            {
              number: 4,
              text: "And God saw that the light was good. Then he separated the light from the darkness.",
            },
            {
              number: 5,
              text: 'God called the light "day" and the darkness "night." And evening passed and morning came, marking the first day.',
            },
          ],
        },
        {
          title: "The Second Day - Sky and Water",
          verses: [
            {
              number: 6,
              text: 'Then God said, "Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth."',
            },
            {
              number: 7,
              text: "And that is what happened. God made this space to separate the waters of the earth from the waters of the heavens.",
            },
            {
              number: 8,
              text: 'God called the space "sky." And evening passed and morning came, marking the second day.',
            },
          ],
        },
        {
          title: "The Third Day - Land and Plants",
          verses: [
            {
              number: 9,
              text: 'Then God said, "Let the waters beneath the sky flow together into one place, so dry ground may appear." And that is what happened.',
            },
            {
              number: 10,
              text: 'God called the dry ground "land" and the waters "seas." And God saw that it was good.',
            },
            {
              number: 11,
              text: 'Then God said, "Let the land sprout with vegetation—every sort of seed-bearing plant, and trees that grow seed-bearing fruit. These seeds will then produce the kinds of plants and trees from which they came." And that is what happened.',
            },
            {
              number: 12,
              text: "The land produced vegetation—all sorts of seed-bearing plants, and trees with seed-bearing fruit. Their seeds produced plants and trees of the same kind. And God saw that it was good.",
            },
            {
              number: 13,
              text: "And evening passed and morning came, marking the third day.",
            },
          ],
        },
        {
          title: "The Fourth Day - Sun, Moon, and Stars",
          verses: [
            {
              number: 14,
              text: 'Then God said, "Let lights appear in the sky to separate the day from the night. Let them be signs to mark the seasons, days, and years."',
            },
            {
              number: 15,
              text: 'Let these lights in the sky shine down on the earth." And that is what happened.',
            },
            {
              number: 16,
              text: "God made two great lights—the larger one to govern the day, and the smaller one to govern the night. He also made the stars.",
            },
            {
              number: 17,
              text: "God set these lights in the sky to light the earth,",
            },
            {
              number: 18,
              text: "to govern the day and night, and to separate the light from the darkness. And God saw that it was good.",
            },
            {
              number: 19,
              text: "And evening passed and morning came, marking the fourth day.",
            },
          ],
        },
        {
          title: "The Fifth Day - Sea Creatures and Birds",
          verses: [
            {
              number: 20,
              text: 'Then God said, "Let the waters swarm with fish and other life. Let the skies be filled with birds of every kind."',
            },
            {
              number: 21,
              text: "So God created great sea creatures and every living thing that scurries and swarms in the water, and every sort of bird—each producing offspring of the same kind. And God saw that it was good.",
            },
            {
              number: 22,
              text: 'Then God blessed them, saying, "Be fruitful and multiply. Let the fish fill the seas, and let the birds multiply on the earth."',
            },
            {
              number: 23,
              text: "And evening passed and morning came, marking the fifth day.",
            },
          ],
        },
        {
          title: "The Sixth Day - Animals and Humans",
          verses: [
            {
              number: 24,
              text: 'Then God said, "Let the earth produce every sort of animal, each producing offspring of the same kind—livestock, small animals that scurry along the ground, and wild animals." And that is what happened.',
            },
            {
              number: 25,
              text: "God made all sorts of wild animals, livestock, and small animals, each able to produce offspring of the same kind. And God saw that it was good.",
            },
            {
              number: 26,
              text: 'Then God said, "Let us make human beings in our image, to be like us. They will reign over the fish in the sea, the birds in the sky, the livestock, all the wild animals on the earth, and the small animals that scurry along the ground."',
            },
            {
              number: 27,
              text: "So God created human beings in his own image. In the image of God he created them; male and female he created them.",
            },
            {
              number: 28,
              text: 'Then God blessed them and said, "Be fruitful and multiply. Fill the earth and govern it. Reign over the fish in the sea, the birds in the sky, and all the animals that scurry along the ground."',
            },
            {
              number: 29,
              text: 'Then God said, "Look! I have given you every seed-bearing plant throughout the earth and all the fruit trees for your food."',
            },
            {
              number: 30,
              text: 'And I have given every green plant as food for all the wild animals, the birds in the sky, and the small animals that scurry along the ground—everything that has life." And that is what happened.',
            },
            {
              number: 31,
              text: "Then God looked over all he had made, and he saw that it was very good! And evening passed and morning came, marking the sixth day.",
            },
          ],
        },
      ],
    },
    {
      id: "romans-8",
      book: "Romans",
      chapter: 8,
      title: "Life in the Spirit",
      sections: [
        {
          title: "Life in the Spirit",
          verses: [
            {
              number: 1,
              text: "So now there is no condemnation for those who belong to Christ Jesus.",
            },
            {
              number: 2,
              text: "And because you belong to him, the power of the life-giving Spirit has freed you from the power of sin that leads to death.",
            },
            {
              number: 3,
              text: "The law of Moses was unable to save us because of the weakness of our sinful nature. So God did what the law could not do. He sent his own Son in a body like the bodies we sinners have. And in that body God declared an end to sin's control over us by giving his Son as a sacrifice for our sins.",
            },
            {
              number: 4,
              text: "He did this so that the just requirement of the law would be fully satisfied for us, who no longer follow our sinful nature but instead follow the Spirit.",
            },
            {
              number: 5,
              text: "Those who are dominated by the sinful nature think about sinful things, but those who are controlled by the Holy Spirit think about things that please the Spirit.",
            },
            {
              number: 6,
              text: "So letting your sinful nature control your mind leads to death. But letting the Spirit control your mind leads to life and peace.",
            },
          ],
        },
        {
          title: "The Spirit of Life",
          verses: [
            {
              number: 9,
              text: "But you are not controlled by your sinful nature. You are controlled by the Spirit if you have the Spirit of God living in you. (And remember that those who do not have the Spirit of Christ living in them do not belong to him at all.)",
            },
            {
              number: 10,
              text: "And Christ lives within you, so even though your body will die because of sin, the Spirit gives you life because you have been made right with God.",
            },
            {
              number: 11,
              text: "The Spirit of God, who raised Jesus from the dead, lives in you. And just as God raised Christ Jesus from the dead, he will give life to your mortal bodies by this same Spirit living within you.",
            },
            {
              number: 12,
              text: "Therefore, dear brothers and sisters, you have no obligation to do what your sinful nature urges you to do.",
            },
            {
              number: 13,
              text: "For if you live by its dictates, you will die. But if through the power of the Spirit you put to death the deeds of your sinful nature, you will live.",
            },
            {
              number: 14,
              text: "For all who are led by the Spirit of God are children of God.",
            },
            {
              number: 15,
              text: "So you have not received a spirit that makes you fearful slaves. Instead, you received God's Spirit when he adopted you as his own children. Now we call him, 'Abba, Father.'",
            },
            {
              number: 16,
              text: "For his Spirit joins with our spirit to affirm that we are God's children.",
            },
          ],
        },
        {
          title: "The Glory Awaiting Us",
          verses: [
            {
              number: 18,
              text: "Yet what we suffer now is nothing compared to the glory he will reveal to us later.",
            },
            {
              number: 26,
              text: "And the Holy Spirit helps us in our weakness. For example, we don't know what God wants us to pray for. But the Holy Spirit prays for us with groanings that cannot be expressed in words.",
            },
            {
              number: 27,
              text: "And the Father who knows all hearts knows what the Spirit is saying, for the Spirit pleads for us believers in harmony with God's own will.",
            },
            {
              number: 28,
              text: "And we know that God causes everything to work together for the good of those who love God and are called according to his purpose for them.",
            },
            {
              number: 29,
              text: "For God knew his people in advance, and he chose them to become like his Son, so that his Son would be the firstborn among many brothers and sisters.",
            },
            {
              number: 30,
              text: "And having chosen them, he called them to come to him. And having called them, he gave them right standing with himself. And having given them right standing, he gave them his glory.",
            },
          ],
        },
        {
          title: "Nothing Can Separate Us",
          verses: [
            {
              number: 31,
              text: "What shall we say about such wonderful things as these? If God is for us, who can ever be against us?",
            },
            {
              number: 32,
              text: "Since he did not spare even his own Son but gave him up for us all, won't he also give us everything else?",
            },
            {
              number: 35,
              text: "Can anything ever separate us from Christ's love? Does it mean he no longer loves us if we have trouble or calamity, or are persecuted, or hungry, or destitute, or in danger, or threatened with death?",
            },
            {
              number: 37,
              text: "No, despite all these things, overwhelming victory is ours through Christ, who loved us.",
            },
            {
              number: 38,
              text: "And I am convinced that nothing can ever separate us from God's love. Neither death nor life, neither angels nor demons, neither our fears for today nor our worries about tomorrow—not even the powers of hell can separate us from God's love.",
            },
            {
              number: 39,
              text: "No power in the sky above or in the earth below—indeed, nothing in all creation will ever be able to separate us from the love of God that is revealed in Christ Jesus our Lord.",
            },
          ],
        },
      ],
    },
  ];

  const currentChapter = bibleChapters.find((ch) => ch.id === selectedChapter) || bibleChapters[0];

  const translations = ["NLT", "NIV", "ESV", "KJV", "MSG"];

  const fontSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const fontSizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  return (
    <div className="min-h-screen bg-background pb-[160px]">
      {/* Header Controls */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Chapter Selector */}
          <Select value={selectedChapter} onValueChange={setSelectedChapter}>
            <SelectTrigger className="w-[140px] h-10 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bibleChapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id}>
                  {chapter.book} {chapter.chapter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Translation Selector */}
          <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
            <SelectTrigger className="w-[100px] h-10 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {translations.map((trans) => (
                <SelectItem key={trans} value={trans}>
                  {trans}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Font Size Selector */}
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger className="w-10 h-10 border-border">
              <Type className="h-10 w-10" />
            </SelectTrigger>
            <SelectContent>
              {fontSizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Bible Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Chapter Title */}
        <h1 className="text-2xl font-bold text-foreground mb-6">{currentChapter.title}</h1>

        {/* Sections and Verses */}
        <div className="space-y-6">
          {currentChapter.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {section.title && (
                <h2 className="text-lg font-semibold text-foreground mt-6 mb-3">
                  {section.title}
                </h2>
              )}

              <div className="space-y-2">
                {section.verses.map((verse) => (
                  <div key={verse.number} className="flex gap-3">
                    <span
                      className={cn(
                        "flex-shrink-0 font-bold text-foreground w-6 text-right",
                        fontSizes[fontSize as keyof typeof fontSizes]
                      )}
                    >
                      {verse.number}
                    </span>
                    <p
                      className={cn(
                        "flex-1 text-foreground leading-relaxed",
                        fontSizes[fontSize as keyof typeof fontSizes]
                      )}
                    >
                      {verse.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Activity Panel */}
      <ActivityPanel isActive={isReadingActive} onStartScroll={handleStartScroll} />
    </div>
  );
};

export default Read;
