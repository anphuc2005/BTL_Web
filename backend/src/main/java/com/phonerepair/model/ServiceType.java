package com.phonerepair.model;

public enum ServiceType {
    BATTERY("Pin"),
    SCREEN("Màn hình"),
    CHARGING_PORT("Cổng sạc"),
    CAMERA("Camera"),
    ANTENNA("Chân sóng"),
    OTHER("Khác");

    private final String displayName;

    ServiceType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
