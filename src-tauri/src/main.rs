// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};

#[allow(dead_code)]
#[derive(Debug, Deserialize, Serialize)]
struct Wind {
    #[serde(rename = "DATE")]
    date: String,
    #[serde(rename = "WIND")]
    wind: f64,
    #[serde(rename = "IND")]
    index: f64,
    #[serde(rename = "RAIN")]
    rain: f64,
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_csv_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn get_csv_data(path: &str) -> Vec<Wind> {
    let mut rdr = csv::Reader::from_path(path).unwrap();
    let mut v = Vec::new();

    for result in rdr.deserialize() {
        let record: Wind = result.unwrap();
        v.push(record);
    }
    v
}
