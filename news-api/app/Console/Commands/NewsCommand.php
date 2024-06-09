<?php

namespace App\Console\Commands;

use App\Models\Author;
use App\Models\Category;
use App\Models\News;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

class NewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetches the latest news and updates the database.';

    /**
     * The HTTP client instance.
     *
     * @var \GuzzleHttp\Client
     */
    protected $http;

    public function __construct()
    {
        parent::__construct();
        $this->http = new Client([
            'base_uri' => 'https://newsapi.org/v2/',
            'verify' => false, 
        ]);
    }

    public function handle()
    {
        $response = $this->http->get('everything', [
            'query' => [
                'apiKey' => config('services.news.news_api_key'),
                'q' => 'latest news',
            ]
        ]);

        $data = json_decode($response->getBody()->getContents(), true);
        
        if (isset($data['articles'])) {
            foreach ($data['articles'] as $article) {
                // Handle Category
                $category = Category::firstOrCreate(['name' => $article['category'] ?? 'Default category']);

                // Handle Author
                $author = Author::firstOrCreate(['name' => $article['author'] ?? 'Default Author']);

                // Handle Source
                $source = Source::firstOrCreate(['name' => $article['source']['name'] ?? 'Default Source']);

                // Parse and format publishedAt date
                $publishedAt = Carbon::parse($article['publishedAt'])->toDateTimeString(); 
                $imageUrl = 'https://example.com/default-image.jpg';

                // Create or Update News
                News::updateOrCreate(
                    ['title' => $article['title']],
                    [
                        'description' => $article['description'] ?? 'No Description',
                        'url' => $article['url'],
                        'language' => $article['language'] ?? 'en',
                        'category_id' => $category->id,
                        'author_id' => $author->id,
                        'source_id' => $source->id,
                        'image' => $article['urlToImage'] ?? $imageUrl,
                        'publishAt' => $publishedAt,
                        'content' => $article['content'] ?? null,
                    ]
                );
            }
        }

        $this->info('News fetched and updated successfully.');
        return true;
    }
}
