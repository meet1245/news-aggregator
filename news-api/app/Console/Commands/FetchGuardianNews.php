<?php

namespace App\Console\Commands;

use App\Models\Author;
use App\Models\Category;
use App\Models\News;
use App\Models\Source;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class FetchGuardianNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-guardian-news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetches the latest news and updates the database.';

    protected $http;

    public function __construct()
    {
        parent::__construct();
        $this->http = new Client([
            'base_uri' => 'https://content.guardianapis.com/',
            'verify' => false, 
        ]);
    }

    public function handle()
    {
        
        $response = $this->http->get('search', [
            'query' => [
                'api-key' => config('services.news.guardian_api_key'),
                'q' => 'latest news',
            ]
        ]);

        $data = json_decode($response->getBody()->getContents(), true);

        $data = $data['response'];
        
        if (isset($data['results'])) {
            foreach ($data['results'] as $article) {

     
                // Handle Category
                $category = Category::firstOrCreate(['name' => $article['sectionName'] ?? 'Default category']);

                // Handle Author
                $author = Author::firstOrCreate(['name' => $article['author'] ?? 'Default Author']);

                // Handle Source
                $source = Source::firstOrCreate(['name' => $article['type'] ?? 'Default Source']);

                // Parse and format publishedAt date
                $publishedAt = Carbon::now()->toDateTimeString(); 
                $imageUrl = 'https://example.com/default-image.jpg';

                // Create or Update News
                News::updateOrCreate(
                    ['title' => $article['webTitle']],
                    [
                        'description' => @$article['description'] ?? 'No Description',
                        'url' => $article['webUrl'],
                        'language' => $article['language'] ?? 'en',
                        'category_id' => $category->id,
                        'author_id' => $author->id,
                        'source_id' => $source->id,
                        'image' => @$article['urlToImage'] ?? $imageUrl,
                        'publishAt' => $publishedAt,
                        'content' => @$article['content'] ?? "No Content",
                    ]
                );
            }
        }

        $this->info('News fetched and updated successfully.');
        return true;
    }
}
