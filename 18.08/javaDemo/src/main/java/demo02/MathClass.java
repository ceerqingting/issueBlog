package demo02;

/**
 * Created by jiangf001 on 2018/8/13.
 */
public class MathClass {
    public void randomNum() {
        int[] nums = new int[10];
        for(int i = 0; i < 10; i++) {
            nums[i] = (int)(Math.random()*10);
        }
        for(int num: nums) {
            System.out.println(num + " ");
        }
    }
    public void test() {
        double a = 12.81;
        int b = (int) a;
        System.out.println("强制类型转换：" + b);
        long c = Math.round(a);
        System.out.println("四舍五入：" + c);
        double d = Math.floor(a);
        System.out.println("floor:" + d);
        double e = Math.ceil(a);
        System.out.println("ceil:" + e);
        double x = Math.random();
        System.out.println("随机数：" + x);
        int y = (int)(Math.random()*99);
        System.out.println("产生[0, 99)之间的随机正数：" + y);
    }
    public static void main(String[] args) {
         MathClass mc = new MathClass();
//        mc.test();
        mc.randomNum();
    }
}
