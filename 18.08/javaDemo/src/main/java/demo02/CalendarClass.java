package demo02;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by jiangf001 on 2018/8/13.
 */
public class CalendarClass {
    public void test() {
        Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH) + 1;
        int day = c.get(Calendar.DAY_OF_MONTH);
        int hour = c.get(Calendar.HOUR_OF_DAY);
        int minute = c.get(Calendar.MINUTE);
        int second = c.get(Calendar.SECOND);
        System.out.println("当前时间：" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
        Date date = c.getTime();
        Long time = c.getTimeInMillis();
        System.out.println("当前时间：" + date);
        System.out.println("当前毫秒数：" + time);
    }
    public static void main(String[] args) {
        CalendarClass cc = new CalendarClass();
        cc.test();
    }
}
