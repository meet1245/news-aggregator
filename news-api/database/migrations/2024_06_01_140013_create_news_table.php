<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image');  // Changed column name
            $table->date('publishAt');  // Changed column name and type
            $table->text('content');  // Changed column name
            $table->string('url');
            $table->string('language');
            $table->foreignId('source_id')->constrained('sources')->onDelete('cascade');  // Foreign key for source
            $table->foreignId('author_id')->constrained('authors')->onDelete('cascade');  // Foreign key for author
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');  // Foreign key for category
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
