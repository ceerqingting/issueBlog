package demo02;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by jiangf001 on 2018/8/13.
 */
public class DateClass {
    public void test() throws ParseException {
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String today = sdf.format(d);
        String day = "2014年02月14日 10:30:25";
        SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        Date date = df.parse(day);
        System.out.println(d);
        System.out.println(today);
        System.out.println("当前时间为：" + date);
    }
    public static void main(String[] args) throws ParseException {
        DateClass dc = new DateClass();
        dc.test();
    }
}
