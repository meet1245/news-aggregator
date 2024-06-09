<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        $settings =  Setting::get();
        
        return $this->sendResponse($settings);
    }

    public function updateSetting(Request $request){
        
        $settings = $request->all();
        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => @$setting['key']], [
                'key'   => $setting['key'],
                'value' => $setting['value'],
            ]);
        }
        
        return $this->sendSuccess('Setting updated successfully.');
    }
}
