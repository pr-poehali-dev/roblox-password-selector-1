import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface RobloxItem {
  id: number;
  name: string;
  type: string;
  price: number | null;
  thumbnail: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

const Index = () => {
  const [username, setUsername] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [inventory, setInventory] = useState<RobloxItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const { toast } = useToast();

  const mockInventory: RobloxItem[] = [
    { id: 1, name: 'Crimson Samurai Helmet', type: 'Hat', price: 1500, thumbnail: '🎩', rarity: 'legendary' },
    { id: 2, name: 'Neon Wings', type: 'Back Accessory', price: 800, thumbnail: '🪽', rarity: 'epic' },
    { id: 3, name: 'Galaxy Sword', type: 'Gear', price: 2000, thumbnail: '⚔️', rarity: 'legendary' },
    { id: 4, name: 'Cool Shades', type: 'Face Accessory', price: 150, thumbnail: '🕶️', rarity: 'common' },
    { id: 5, name: 'Lightning Hair', type: 'Hair', price: 500, thumbnail: '⚡', rarity: 'rare' },
    { id: 6, name: 'Dragon Scale Armor', type: 'Shirt', price: 1200, thumbnail: '🛡️', rarity: 'epic' },
    { id: 7, name: 'Pixel Sneakers', type: 'Pants', price: 300, thumbnail: '👟', rarity: 'uncommon' },
    { id: 8, name: 'Rainbow Cape', type: 'Back Accessory', price: 900, thumbnail: '🌈', rarity: 'rare' },
  ];

  const handleSearch = async () => {
    if (!username.trim()) {
      toast({
        title: 'Введите username',
        description: 'Пожалуйста, укажите имя пользователя Roblox',
        variant: 'destructive',
      });
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      setInventory(mockInventory);
      setIsSearching(false);
      toast({
        title: 'Инвентарь загружен!',
        description: `Найдено ${mockInventory.length} предметов для ${username}`,
      });
    }, 1500);
  };

  const filters = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'Hat', label: 'Шапки', icon: 'Sparkles' },
    { id: 'Shirt', label: 'Одежда', icon: 'Shirt' },
    { id: 'Gear', label: 'Снаряжение', icon: 'Swords' },
  ];

  const filteredInventory = selectedFilter === 'all' 
    ? inventory 
    : inventory.filter(item => item.type === selectedFilter);

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      uncommon: 'bg-green-500/20 text-green-300 border-green-500/30',
      rare: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      epic: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      legendary: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F3A] to-[#2D1B3D] text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Icon name="Package" size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] bg-clip-text text-transparent">
            Roblox Inventory Viewer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Просмотр инвентаря любого игрока Roblox в удобном интерфейсе
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl shadow-purple-500/10">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Введите username игрока..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-lg focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="h-14 px-8 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 transition-all shadow-lg shadow-purple-500/30 text-lg font-semibold"
              >
                {isSearching ? (
                  <Icon name="Loader2" size={20} className="animate-spin" />
                ) : (
                  <>
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {inventory.length > 0 && (
          <div className="animate-scale-in">
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] shadow-lg shadow-purple-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Icon name={filter.icon as any} size={18} className="mr-2" />
                  {filter.label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredInventory.map((item, index) => (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
                  
                  <div className="relative p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className={`${getRarityColor(item.rarity)} border font-medium`}>
                        {item.rarity}
                      </Badge>
                      <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {item.thumbnail}
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-2 text-white group-hover:text-purple-300 transition-colors">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Icon name="Tag" size={14} />
                        {item.type}
                      </span>
                      {item.price && (
                        <span className="flex items-center gap-1 font-semibold text-emerald-400">
                          <Icon name="Coins" size={14} />
                          {item.price}R$
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Card>
              ))}
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-16">
                <Icon name="PackageOpen" size={64} className="mx-auto mb-4 text-gray-600" />
                <p className="text-xl text-gray-400">Предметы не найдены в этой категории</p>
              </div>
            )}
          </div>
        )}

        {inventory.length === 0 && !isSearching && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Icon name="Search" size={48} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-300">
              Начните поиск
            </h2>
            <p className="text-gray-500">
              Введите username игрока, чтобы увидеть его инвентарь
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
